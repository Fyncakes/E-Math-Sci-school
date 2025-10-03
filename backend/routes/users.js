const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile/:id
// @desc    Get user profile
// @access  Public
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('enrolledCourses', 'title subject grade thumbnail')
      .populate('achievements', 'title description icon');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/students
// @desc    Get all students (for teachers/admins)
// @access  Private (Teachers and Admins)
router.get('/students', auth, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, grade, subject } = req.query;
    
    const filter = { role: 'student', isActive: true };
    if (grade) filter.grade = grade;
    if (subject) filter.subjects = subject;

    const students = await User.find(filter)
      .select('-password')
      .populate('enrolledCourses', 'title subject')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      students,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalStudents: total
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/teachers
// @desc    Get all teachers
// @access  Public
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher', isActive: true })
      .select('-password')
      .populate('subjects')
      .sort({ firstName: 1 });

    res.json({ teachers });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
