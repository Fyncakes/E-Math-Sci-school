const express = require('express');
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all published courses with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      subject, 
      grade, 
      difficulty, 
      isFree, 
      search, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { isPublished: true };
    
    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;
    if (difficulty) filter.difficulty = difficulty;
    if (isFree !== undefined) filter.isFree = isFree === 'true';
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const courses = await Course.find(filter)
      .populate('instructor', 'firstName lastName avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-modules.lessons.content');

    const total = await Course.countDocuments(filter);

    res.json({
      courses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalCourses: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course with full details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName avatar subjects')
      .populate('prerequisites', 'title description');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.isPublished) {
      return res.status(404).json({ message: 'Course not available' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses
// @desc    Create new course
// @access  Private (Teachers and Admins)
router.post('/', auth, authorize('teacher', 'admin'), [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be 5-100 characters'),
  body('description').trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be 20-1000 characters'),
  body('subject').isIn(['mathematics', 'physics', 'chemistry', 'biology', 'computer-science']).withMessage('Invalid subject'),
  body('grade').isIn(['6', '7', '8', '9', '10', '11', '12', 'college']).withMessage('Invalid grade'),
  body('duration').isInt({ min: 1, max: 52 }).withMessage('Duration must be 1-52 weeks'),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const courseData = {
      ...req.body,
      instructor: req.user._id
    };

    const course = new Course(courseData);
    await course.save();

    await course.populate('instructor', 'firstName lastName avatar');

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error during course creation' });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Course Instructor or Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is instructor or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('instructor', 'firstName lastName avatar');

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Server error during course update' });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll student in course
// @access  Private (Students)
router.post('/:id/enroll', auth, authorize('student'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.isPublished) {
      return res.status(400).json({ message: 'Course is not available for enrollment' });
    }

    // Check if already enrolled
    const alreadyEnrolled = course.enrolledStudents.some(
      enrollment => enrollment.student.toString() === req.user._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add student to course
    course.enrolledStudents.push({
      student: req.user._id,
      enrolledAt: new Date()
    });

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enrolledCourses: course._id }
    });

    course.totalStudents = course.enrolledStudents.length;
    await course.save();

    res.json({
      message: 'Successfully enrolled in course',
      course: {
        id: course._id,
        title: course.title,
        enrolledAt: new Date()
      }
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
});

// @route   POST /api/courses/:id/rate
// @desc    Rate and review course
// @access  Private (Enrolled Students)
router.post('/:id/rate', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().isLength({ max: 500 }).withMessage('Review cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if student is enrolled
    const isEnrolled = course.enrolledStudents.some(
      enrollment => enrollment.student.toString() === req.user._id.toString()
    );

    if (!isEnrolled) {
      return res.status(400).json({ message: 'Must be enrolled to rate this course' });
    }

    // Check if already rated
    const existingRating = course.ratings.find(
      rating => rating.student.toString() === req.user._id.toString()
    );

    if (existingRating) {
      return res.status(400).json({ message: 'Already rated this course' });
    }

    const { rating, review } = req.body;

    course.ratings.push({
      student: req.user._id,
      rating,
      review
    });

    course.calculateAverageRating();
    await course.save();

    res.json({
      message: 'Course rated successfully',
      averageRating: course.averageRating
    });
  } catch (error) {
    console.error('Rate course error:', error);
    res.status(500).json({ message: 'Server error during rating' });
  }
});

// @route   GET /api/courses/:id/students
// @desc    Get enrolled students (for instructors)
// @access  Private (Course Instructor or Admin)
router.get('/:id/students', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('enrolledStudents.student', 'firstName lastName email grade avatar');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is instructor or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view students' });
    }

    res.json({
      students: course.enrolledStudents,
      totalStudents: course.totalStudents
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
