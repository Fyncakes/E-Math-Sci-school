const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    let analytics = {};

    if (userRole === 'student') {
      // Student analytics
      const enrolledCourses = await Course.find({
        'enrolledStudents.student': userId
      }).populate('instructor', 'firstName lastName');

      const assignments = await Assignment.find({
        'submissions.student': userId
      }).populate('course', 'title subject');

      const recentSubmissions = assignments
        .filter(assignment => 
          assignment.submissions.some(sub => sub.student.toString() === userId.toString())
        )
        .map(assignment => {
          const submission = assignment.submissions.find(sub => 
            sub.student.toString() === userId.toString()
          );
          return {
            assignmentTitle: assignment.title,
            courseTitle: assignment.course.title,
            score: submission.totalScore,
            maxScore: assignment.maxPoints,
            grade: submission.grade,
            submittedAt: submission.submittedAt
          };
        })
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .slice(0, 5);

      const totalCourses = enrolledCourses.length;
      const totalAssignments = assignments.length;
      const averageScore = assignments.length > 0 ? 
        assignments.reduce((sum, assignment) => {
          const submission = assignment.submissions.find(sub => 
            sub.student.toString() === userId.toString()
          );
          return sum + (submission ? submission.totalScore : 0);
        }, 0) / assignments.length : 0;

      analytics = {
        totalCourses,
        totalAssignments,
        averageScore: Math.round(averageScore * 100) / 100,
        enrolledCourses: enrolledCourses.map(course => ({
          id: course._id,
          title: course.title,
          subject: course.subject,
          instructor: course.instructor,
          progress: course.enrolledStudents.find(
            enrollment => enrollment.student.toString() === userId.toString()
          )?.progress || 0
        })),
        recentSubmissions
      };
    } else if (userRole === 'teacher') {
      // Teacher analytics
      const myCourses = await Course.find({ instructor: userId });
      const myAssignments = await Assignment.find({ instructor: userId });

      const totalStudents = myCourses.reduce((sum, course) => 
        sum + course.enrolledStudents.length, 0
      );

      const totalSubmissions = myAssignments.reduce((sum, assignment) => 
        sum + assignment.submissions.length, 0
      );

      const averageRating = myCourses.length > 0 ? 
        myCourses.reduce((sum, course) => sum + course.averageRating, 0) / myCourses.length : 0;

      const recentCourses = myCourses
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(course => ({
          id: course._id,
          title: course.title,
          subject: course.subject,
          totalStudents: course.totalStudents,
          averageRating: course.averageRating
        }));

      analytics = {
        totalCourses: myCourses.length,
        totalStudents,
        totalAssignments: myAssignments.length,
        totalSubmissions,
        averageRating: Math.round(averageRating * 100) / 100,
        recentCourses
      };
    } else if (userRole === 'admin') {
      // Admin analytics
      const totalUsers = await User.countDocuments();
      const totalStudents = await User.countDocuments({ role: 'student' });
      const totalTeachers = await User.countDocuments({ role: 'teacher' });
      const totalCourses = await Course.countDocuments();
      const totalAssignments = await Assignment.countDocuments();

      const recentUsers = await User.find()
        .select('firstName lastName email role createdAt')
        .sort({ createdAt: -1 })
        .limit(10);

      const popularSubjects = await Course.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: '$subject', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);

      analytics = {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalCourses,
        totalAssignments,
        recentUsers,
        popularSubjects
      };
    }

    res.json({ analytics });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/course/:id
// @desc    Get course analytics
// @access  Private (Course Instructor or Admin)
router.get('/course/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is instructor or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view course analytics' });
    }

    const assignments = await Assignment.find({ course: course._id })
      .populate('submissions.student', 'firstName lastName');

    const studentProgress = course.enrolledStudents.map(enrollment => {
      const studentAssignments = assignments.filter(assignment =>
        assignment.submissions.some(sub => 
          sub.student.toString() === enrollment.student.toString()
        )
      );

      const totalScore = studentAssignments.reduce((sum, assignment) => {
        const submission = assignment.submissions.find(sub => 
          sub.student.toString() === enrollment.student.toString()
        );
        return sum + (submission ? submission.totalScore : 0);
      }, 0);

      const totalPossible = studentAssignments.reduce((sum, assignment) => 
        sum + assignment.maxPoints, 0
      );

      return {
        student: enrollment.student,
        progress: enrollment.progress,
        totalScore,
        totalPossible,
        averageScore: totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0,
        assignmentsCompleted: studentAssignments.length
      };
    });

    const courseAnalytics = {
      course: {
        id: course._id,
        title: course.title,
        subject: course.subject,
        totalStudents: course.totalStudents,
        averageRating: course.averageRating
      },
      studentProgress,
      assignmentStats: assignments.map(assignment => ({
        id: assignment._id,
        title: assignment.title,
        type: assignment.type,
        totalSubmissions: assignment.submissions.length,
        averageScore: assignment.statistics.averageScore,
        highestScore: assignment.statistics.highestScore,
        lowestScore: assignment.statistics.lowestScore
      }))
    };

    res.json({ analytics: courseAnalytics });
  } catch (error) {
    console.error('Get course analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
