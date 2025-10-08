const express = require('express');
const router = express.Router();

// In-memory storage for courses (temporary solution)
let courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Comprehensive course covering advanced mathematical concepts",
    subject: "mathematics",
    grade: "grade-12",
    duration: 16,
    instructor: "Dr. Sarah Johnson",
    maxStudents: 30,
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    schedule: "Monday, Wednesday, Friday 2:00 PM - 3:30 PM",
    prerequisites: "Basic algebra and geometry",
    objectives: "Master advanced calculus, linear algebra, and statistics",
    materials: [
      { name: "Textbook: Advanced Calculus", type: "document", url: "/materials/calc-textbook.pdf" },
      { name: "Video: Introduction to Linear Algebra", type: "video", url: "/materials/linear-algebra-intro.mp4" }
    ],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    description: "Introduction to physics concepts and principles",
    subject: "physics",
    grade: "grade-10",
    duration: 12,
    instructor: "Prof. Michael Chen",
    maxStudents: 25,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    schedule: "Tuesday, Thursday 1:00 PM - 2:30 PM",
    prerequisites: "Basic mathematics",
    objectives: "Understand fundamental physics laws and principles",
    materials: [
      { name: "Lab Manual", type: "document", url: "/materials/physics-lab-manual.pdf" }
    ],
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// GET /api/courses - Get all courses
router.get('/', (req, res) => {
  try {
    console.log('GET /api/courses - Returning', courses.length, 'courses');
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
});

// GET /api/courses/:id - Get course by ID
router.get('/:id', (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
});

// POST /api/courses - Create new course
router.post('/', (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      grade,
      duration,
      instructor,
      maxStudents,
      startDate,
      endDate,
      schedule,
      prerequisites,
      objectives,
      materials,
      isActive
    } = req.body;

    // Validation
    if (!title || !description || !subject || !grade) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, description, subject, grade'
      });
    }

    const newCourse = {
      id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      title,
      description,
      subject,
      grade,
      duration: duration || 12,
      instructor: instructor || 'TBA',
      maxStudents: maxStudents || 30,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      schedule: schedule || 'TBA',
      prerequisites: prerequisites || '',
      objectives: objectives || '',
      materials: materials || [],
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString()
    };

    courses.push(newCourse);
    console.log('POST /api/courses - Added new course:', newCourse.title, 'Total courses:', courses.length);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: newCourse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
});

// PUT /api/courses/:id - Update course
router.put('/:id', (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    
    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    courses[courseIndex] = {
      ...courses[courseIndex],
      ...req.body,
      id: courseId,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: courses[courseIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
});

// DELETE /api/courses/:id - Delete course
router.delete('/:id', (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    
    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    courses.splice(courseIndex, 1);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
});

module.exports = router;