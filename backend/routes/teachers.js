const express = require('express');
const router = express.Router();
// const Teacher = require('../models/Teacher');
// const { auth } = require('../middleware/auth');

// In-memory storage for demo purposes
let teachers = [
  {
    _id: '1',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@eschool.com',
    title: 'Mathematics Professor',
    subjects: ['Mathematics', 'Statistics'],
    experience: '15 years',
    education: 'PhD in Mathematics',
    bio: 'Passionate mathematics educator with expertise in calculus and statistics.',
    phone: '+1-555-0123',
    image: '/images/teacher1.jpg',
    rating: 4.8,
    studentsTaught: 250,
    achievements: ['Teacher of the Year 2023', 'Excellence in Education Award'],
    specialties: ['Calculus', 'Linear Algebra', 'Statistics'],
    status: 'active',
    createdAt: new Date()
  },
  {
    _id: '2',
    firstName: 'Prof. Michael',
    lastName: 'Chen',
    email: 'michael.chen@eschool.com',
    title: 'Physics Professor',
    subjects: ['Physics', 'Engineering'],
    experience: '12 years',
    education: 'PhD in Physics',
    bio: 'Dedicated physics educator specializing in mechanics and thermodynamics.',
    phone: '+1-555-0124',
    image: '/images/teacher2.jpg',
    rating: 4.9,
    studentsTaught: 180,
    achievements: ['Research Excellence Award', 'Innovative Teaching Award'],
    specialties: ['Mechanics', 'Thermodynamics', 'Quantum Physics'],
    status: 'active',
    createdAt: new Date()
  },
  {
    _id: '3',
    firstName: 'Dr. Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@eschool.com',
    title: 'Chemistry Professor',
    subjects: ['Chemistry', 'Biochemistry'],
    experience: '10 years',
    education: 'PhD in Chemistry',
    bio: 'Experienced chemistry educator with a focus on organic and inorganic chemistry.',
    phone: '+1-555-0125',
    image: '/images/teacher3.jpg',
    rating: 4.7,
    studentsTaught: 200,
    achievements: ['Outstanding Educator Award', 'Student Choice Award'],
    specialties: ['Organic Chemistry', 'Inorganic Chemistry', 'Biochemistry'],
    status: 'active',
    createdAt: new Date()
  }
];

// Get all teachers (public)
router.get('/', async (req, res) => {
  try {
    // Return teachers without password field
    const teachersWithoutPassword = teachers.map(teacher => {
      const { password, ...teacherWithoutPassword } = teacher;
      return teacherWithoutPassword;
    });
    res.json(teachersWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error: error.message });
  }
});

// Get teacher by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const teacher = teachers.find(t => t._id === req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    // Remove password field if it exists
    const { password, ...teacherWithoutPassword } = teacher;
    res.json(teacherWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher', error: error.message });
  }
});

// Add teacher (admin only) - simplified for demo
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, title, subjects, experience, education, bio, phone, image, specialties } = req.body;

    const teacherExists = teachers.find(t => t.email === email);
    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher with this email already exists' });
    }

    const newTeacher = {
      _id: (teachers.length + 1).toString(),
      firstName,
      lastName,
      email,
      title,
      subjects: subjects || [],
      experience,
      education,
      bio,
      phone,
      image: image || '/images/placeholder-avatar.png',
      rating: 0,
      studentsTaught: 0,
      achievements: [],
      specialties: specialties || [],
      status: 'active',
      createdAt: new Date()
    };

    teachers.push(newTeacher);
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error adding teacher', error: error.message });
  }
});

// Update teacher (admin only) - simplified for demo
router.put('/:id', async (req, res) => {
  try {
    const teacherIndex = teachers.findIndex(t => t._id === req.params.id);
    
    if (teacherIndex === -1) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const { firstName, lastName, email, title, subjects, experience, education, bio, phone, image, rating, studentsTaught, achievements, specialties, status } = req.body;

    teachers[teacherIndex] = {
      ...teachers[teacherIndex],
      firstName: firstName || teachers[teacherIndex].firstName,
      lastName: lastName || teachers[teacherIndex].lastName,
      email: email || teachers[teacherIndex].email,
      title: title || teachers[teacherIndex].title,
      subjects: subjects || teachers[teacherIndex].subjects,
      experience: experience || teachers[teacherIndex].experience,
      education: education || teachers[teacherIndex].education,
      bio: bio || teachers[teacherIndex].bio,
      phone: phone || teachers[teacherIndex].phone,
      image: image || teachers[teacherIndex].image,
      rating: rating || teachers[teacherIndex].rating,
      studentsTaught: studentsTaught || teachers[teacherIndex].studentsTaught,
      achievements: achievements || teachers[teacherIndex].achievements,
      specialties: specialties || teachers[teacherIndex].specialties,
      status: status || teachers[teacherIndex].status,
    };

    res.json(teachers[teacherIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error: error.message });
  }
});

// Delete teacher (admin only) - simplified for demo
router.delete('/:id', async (req, res) => {
  try {
    const teacherIndex = teachers.findIndex(t => t._id === req.params.id);
    
    if (teacherIndex === -1) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teachers.splice(teacherIndex, 1);
    res.json({ message: 'Teacher removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error: error.message });
  }
});

// POST /api/teachers - Add a new teacher
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      employeeId,
      subject,
      grade,
      experience,
      qualification,
      password,
      department,
      joinDate,
      salary,
      address,
      emergencyContact,
      emergencyPhone,
      bio,
      isActive
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        error: 'First name, last name, email, and password are required' 
      });
    }

    // Check if teacher with email already exists
    const existingTeacher = teachers.find(teacher => teacher.email === email);
    if (existingTeacher) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        error: 'Teacher with this email already exists' 
      });
    }

    // Create new teacher
    const newTeacher = {
      _id: (teachers.length + 1).toString(),
      firstName,
      lastName,
      email,
      phone: phone || '',
      employeeId: employeeId || '',
      title: `${firstName} ${lastName}`,
      subjects: subject ? [subject] : [],
      experience: experience || '',
      education: qualification || '',
      bio: bio || '',
      department: department || '',
      joinDate: joinDate || new Date().toISOString(),
      salary: salary || '',
      address: address || '',
      emergencyContact: emergencyContact || '',
      emergencyPhone: emergencyPhone || '',
      rating: 0,
      studentsTaught: 0,
      achievements: [],
      specialties: subject ? [subject] : [],
      status: isActive ? 'active' : 'inactive',
      createdAt: new Date(),
      password: password // In a real app, this should be hashed
    };

    teachers.push(newTeacher);

    res.status(201).json({
      message: 'Teacher added successfully',
      teacher: {
        _id: newTeacher._id,
        firstName: newTeacher.firstName,
        lastName: newTeacher.lastName,
        email: newTeacher.email,
        title: newTeacher.title,
        subjects: newTeacher.subjects,
        experience: newTeacher.experience,
        education: newTeacher.education,
        bio: newTeacher.bio,
        phone: newTeacher.phone,
        department: newTeacher.department,
        status: newTeacher.status,
        createdAt: newTeacher.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding teacher', error: error.message });
  }
});

module.exports = router;