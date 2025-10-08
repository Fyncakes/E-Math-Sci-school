const express = require('express');
const router = express.Router();
// const Admission = require('../models/Admission');
// const User = require('../models/User');
// const { auth } = require('../middleware/auth');

// In-memory storage for demo purposes
let admissions = [
  {
    _id: '1',
    student: 'student1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gradeApplyingFor: 'Grade 10',
    parentName: 'Jane Doe',
    parentEmail: 'jane.doe@example.com',
    parentPhone: '+1-555-0101',
    applicationDate: new Date('2024-01-15'),
    status: 'approved',
    adminNotes: 'Excellent academic record',
    approvalDate: new Date('2024-01-20'),
    approvedBy: 'admin1'
  },
  {
    _id: '2',
    student: 'student2',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    gradeApplyingFor: 'Grade 9',
    parentName: 'Bob Smith',
    parentEmail: 'bob.smith@example.com',
    parentPhone: '+1-555-0102',
    applicationDate: new Date('2024-01-20'),
    status: 'pending',
    adminNotes: '',
    approvalDate: null,
    approvedBy: null
  },
  {
    _id: '3',
    student: 'student3',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@example.com',
    gradeApplyingFor: 'Grade 11',
    parentName: 'David Wilson',
    parentEmail: 'david.wilson@example.com',
    parentPhone: '+1-555-0103',
    applicationDate: new Date('2024-01-25'),
    status: 'waitlisted',
    adminNotes: 'Good candidate, but limited spots available',
    approvalDate: null,
    approvedBy: null
  }
];

// Get all admissions (admin only) - simplified for demo
router.get('/', async (req, res) => {
  try {
    // For demo purposes, return all admissions
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions', error: error.message });
  }
});

// Get single admission by ID (admin or student if it's their own) - simplified for demo
router.get('/:id', async (req, res) => {
  try {
    const admission = admissions.find(a => a._id === req.params.id);
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admission', error: error.message });
  }
});

// Create new admission (student only) - simplified for demo
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, gradeApplyingFor, parentName, parentEmail, parentPhone } = req.body;

    const existingAdmission = admissions.find(a => a.email === email && ['pending', 'waitlisted'].includes(a.status));
    if (existingAdmission) {
      return res.status(400).json({ message: 'You already have a pending or waitlisted application.' });
    }

    const admission = {
      _id: (admissions.length + 1).toString(),
      student: 'student' + (admissions.length + 1), // Demo student ID
      firstName,
      lastName,
      email,
      gradeApplyingFor,
      parentName,
      parentEmail,
      parentPhone,
      applicationDate: new Date(),
      status: 'pending',
      adminNotes: '',
      approvalDate: null,
      approvedBy: null
    };

    admissions.push(admission);
    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admission', error: error.message });
  }
});

// Update admission status (admin only) - simplified for demo
router.put('/:id/status', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const admissionIndex = admissions.findIndex(a => a._id === req.params.id);

    if (admissionIndex === -1) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    admissions[admissionIndex].status = status || admissions[admissionIndex].status;
    admissions[admissionIndex].adminNotes = adminNotes || admissions[admissionIndex].adminNotes;
    
    if (status === 'approved' && !admissions[admissionIndex].approvalDate) {
      admissions[admissionIndex].approvalDate = new Date();
      admissions[admissionIndex].approvedBy = 'admin1'; // Demo admin ID
    } else if (status !== 'approved') {
      admissions[admissionIndex].approvalDate = null;
      admissions[admissionIndex].approvedBy = null;
    }

    res.json(admissions[admissionIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admission status', error: error.message });
  }
});

// Delete admission (admin only) - simplified for demo
router.delete('/:id', async (req, res) => {
  try {
    const admissionIndex = admissions.findIndex(a => a._id === req.params.id);
    
    if (admissionIndex === -1) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    admissions.splice(admissionIndex, 1);
    res.json({ message: 'Admission removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admission', error: error.message });
  }
});

module.exports = router;