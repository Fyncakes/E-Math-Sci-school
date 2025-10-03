const express = require('express');
const { body, validationResult } = require('express-validator');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/assignments
// @desc    Get assignments with filtering
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { 
      course, 
      subject, 
      grade, 
      type, 
      status = 'all',
      page = 1, 
      limit = 10 
    } = req.query;

    let filter = {};

    // Filter by course if specified
    if (course) filter.course = course;

    // Filter by subject and grade
    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;
    if (type) filter.type = type;

    // Filter by status
    if (status === 'published') filter.isPublished = true;
    if (status === 'draft') filter.isPublished = false;
    if (status === 'overdue') {
      filter.dueDate = { $lt: new Date() };
      filter.isPublished = true;
    }

    // For students, only show published assignments
    if (req.user.role === 'student') {
      filter.isPublished = true;
    }

    const assignments = await Assignment.find(filter)
      .populate('course', 'title subject grade')
      .populate('instructor', 'firstName lastName avatar')
      .sort({ dueDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Assignment.countDocuments(filter);

    res.json({
      assignments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalAssignments: total
      }
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/assignments/:id
// @desc    Get single assignment
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('course', 'title subject grade')
      .populate('instructor', 'firstName lastName avatar')
      .populate('submissions.student', 'firstName lastName avatar');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // For students, only show their own submission
    if (req.user.role === 'student') {
      const studentSubmission = assignment.submissions.find(
        sub => sub.student._id.toString() === req.user._id.toString()
      );
      assignment.submissions = studentSubmission ? [studentSubmission] : [];
    }

    res.json({ assignment });
  } catch (error) {
    console.error('Get assignment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/assignments
// @desc    Create new assignment
// @access  Private (Teachers and Admins)
router.post('/', auth, authorize('teacher', 'admin'), [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be 5-100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be 10-1000 characters'),
  body('course').isMongoId().withMessage('Valid course ID is required'),
  body('type').isIn(['homework', 'quiz', 'project', 'exam', 'lab']).withMessage('Invalid assignment type'),
  body('dueDate').isISO8601().withMessage('Valid due date is required'),
  body('maxPoints').isInt({ min: 1 }).withMessage('Max points must be at least 1')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { course, ...assignmentData } = req.body;

    // Verify course exists and user is instructor
    const courseDoc = await Course.findById(course);
    if (!courseDoc) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (courseDoc.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to create assignments for this course' });
    }

    const assignment = new Assignment({
      ...assignmentData,
      course,
      instructor: req.user._id,
      subject: courseDoc.subject,
      grade: courseDoc.grade
    });

    await assignment.save();

    await assignment.populate('course', 'title subject grade');
    await assignment.populate('instructor', 'firstName lastName avatar');

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment
    });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ message: 'Server error during assignment creation' });
  }
});

// @route   POST /api/assignments/:id/submit
// @desc    Submit assignment
// @access  Private (Students)
router.post('/:id/submit', auth, authorize('student'), [
  body('answers').isArray().withMessage('Answers must be an array'),
  body('answers.*.questionId').isMongoId().withMessage('Valid question ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (!assignment.isPublished) {
      return res.status(400).json({ message: 'Assignment is not available for submission' });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.user._id.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }

    // Check if overdue
    const isLate = new Date() > assignment.dueDate;
    if (isLate && !assignment.allowLateSubmission) {
      return res.status(400).json({ message: 'Assignment submission deadline has passed' });
    }

    const { answers } = req.body;
    let totalScore = 0;

    // Grade the submission
    const gradedAnswers = answers.map(answer => {
      const question = assignment.questions.id(answer.questionId);
      if (!question) return answer;

      let isCorrect = false;
      let pointsEarned = 0;

      if (question.questionType === 'multiple-choice') {
        isCorrect = question.correctAnswer === answer.answer;
      } else if (question.questionType === 'true-false') {
        isCorrect = question.correctAnswer === answer.answer;
      } else if (question.questionType === 'short-answer') {
        // Simple string comparison for short answers
        isCorrect = question.correctAnswer.toLowerCase().trim() === answer.answer.toLowerCase().trim();
      }

      if (isCorrect) {
        pointsEarned = question.points;
        totalScore += pointsEarned;
      }

      return {
        ...answer,
        isCorrect,
        pointsEarned
      };
    });

    // Apply late penalty if applicable
    if (isLate && assignment.latePenalty > 0) {
      totalScore = totalScore * (1 - assignment.latePenalty / 100);
    }

    // Determine grade
    const percentage = (totalScore / assignment.maxPoints) * 100;
    let grade = 'F';
    if (percentage >= 97) grade = 'A+';
    else if (percentage >= 93) grade = 'A';
    else if (percentage >= 90) grade = 'A-';
    else if (percentage >= 87) grade = 'B+';
    else if (percentage >= 83) grade = 'B';
    else if (percentage >= 80) grade = 'B-';
    else if (percentage >= 77) grade = 'C+';
    else if (percentage >= 73) grade = 'C';
    else if (percentage >= 70) grade = 'C-';
    else if (percentage >= 67) grade = 'D+';
    else if (percentage >= 63) grade = 'D';
    else if (percentage >= 60) grade = 'D-';

    const submission = {
      student: req.user._id,
      answers: gradedAnswers,
      submittedAt: new Date(),
      isLate,
      totalScore,
      grade
    };

    assignment.submissions.push(submission);
    assignment.calculateStatistics();
    await assignment.save();

    res.json({
      message: 'Assignment submitted successfully',
      submission: {
        totalScore,
        grade,
        isLate,
        submittedAt: submission.submittedAt
      }
    });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({ message: 'Server error during submission' });
  }
});

module.exports = router;
