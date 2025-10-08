const express = require('express');
const router = express.Router();

// In-memory storage for assignments (temporary solution)
let assignments = [
  {
    id: 1,
    title: "Quadratic Equations Practice",
    description: "Solve various quadratic equations and understand their applications",
    course: "advanced-math",
    subject: "mathematics",
    grade: "grade-11",
    instructor: "Dr. Sarah Johnson",
    maxPoints: 100,
    dueDate: "2024-02-15T23:59:00Z",
    instructions: "Complete all problems in Chapter 5. Show all work and submit by the due date.",
    attachments: [
      { name: "Assignment Template", type: "document", url: "/assignments/quadratic-template.pdf" },
      { name: "Reference Sheet", type: "document", url: "/assignments/math-reference.pdf" }
    ],
    rubric: "Points will be awarded for: Correct answers (60%), Work shown (30%), Neatness (10%)",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Physics Lab Report",
    description: "Write a comprehensive lab report on the pendulum experiment",
    course: "physics-101",
    subject: "physics",
    grade: "grade-10",
    instructor: "Prof. Michael Chen",
    maxPoints: 150,
    dueDate: "2024-02-20T23:59:00Z",
    instructions: "Follow the lab report format provided. Include data analysis and conclusions.",
    attachments: [
      { name: "Lab Report Template", type: "document", url: "/assignments/lab-report-template.docx" }
    ],
    rubric: "Introduction (20%), Methods (20%), Results (30%), Discussion (20%), Conclusion (10%)",
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// GET /api/assignments - Get all assignments
router.get('/', (req, res) => {
  try {
    console.log('GET /api/assignments - Returning', assignments.length, 'assignments');
    res.json({
      success: true,
      data: assignments,
      count: assignments.length
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assignments',
      error: error.message
    });
  }
});

// GET /api/assignments/:id - Get assignment by ID
router.get('/:id', (req, res) => {
  try {
    const assignmentId = parseInt(req.params.id);
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    res.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assignment',
      error: error.message
    });
  }
});

// POST /api/assignments - Create new assignment
router.post('/', (req, res) => {
  try {
    const {
      title,
      description,
      course,
      subject,
      grade,
      instructor,
      maxPoints,
      dueDate,
      instructions,
      attachments,
      rubric,
      isActive
    } = req.body;

    // Validation
    if (!title || !description || !course || !subject || !grade) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, description, course, subject, grade'
      });
    }

    const newAssignment = {
      id: assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1,
      title,
      description,
      course,
      subject,
      grade,
      instructor: instructor || 'TBA',
      maxPoints: maxPoints || 100,
      dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      instructions: instructions || '',
      attachments: attachments || [],
      rubric: rubric || '',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString()
    };

    assignments.push(newAssignment);
    console.log('POST /api/assignments - Added new assignment:', newAssignment.title, 'Total assignments:', assignments.length);

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: newAssignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating assignment',
      error: error.message
    });
  }
});

// PUT /api/assignments/:id - Update assignment
router.put('/:id', (req, res) => {
  try {
    const assignmentId = parseInt(req.params.id);
    const assignmentIndex = assignments.findIndex(a => a.id === assignmentId);
    
    if (assignmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    assignments[assignmentIndex] = {
      ...assignments[assignmentIndex],
      ...req.body,
      id: assignmentId,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Assignment updated successfully',
      data: assignments[assignmentIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating assignment',
      error: error.message
    });
  }
});

// DELETE /api/assignments/:id - Delete assignment
router.delete('/:id', (req, res) => {
  try {
    const assignmentId = parseInt(req.params.id);
    const assignmentIndex = assignments.findIndex(a => a.id === assignmentId);
    
    if (assignmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    assignments.splice(assignmentIndex, 1);

    res.json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting assignment',
      error: error.message
    });
  }
});

module.exports = router;