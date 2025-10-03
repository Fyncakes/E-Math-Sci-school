const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'student',
    grade: '10',
    subjects: ['mathematics', 'physics']
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'teacher',
    subjects: ['mathematics', 'chemistry']
  }
];

const mockCourses = [
  {
    id: '1',
    title: 'Advanced Calculus',
    description: 'Master differential and integral calculus with real-world applications.',
    subject: 'mathematics',
    grade: '12',
    difficulty: 'advanced',
    duration: 12,
    rating: 4.8,
    students: 1250,
    price: 0,
    isFree: true,
    instructor: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    title: 'Quantum Physics Fundamentals',
    description: 'Explore the fascinating world of quantum mechanics and its applications.',
    subject: 'physics',
    grade: 'college',
    difficulty: 'advanced',
    duration: 16,
    rating: 4.9,
    students: 890,
    price: 99,
    isFree: false,
    instructor: 'Prof. Michael Chen'
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'E-Math-Sci School API is running!'
  });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Mock successful login
  res.json({
    message: 'Login successful',
    token: 'mock-jwt-token-' + user.id,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      grade: user.grade,
      subjects: user.subjects
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, password, role = 'student', grade } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }
  
  const newUser = {
    id: (mockUsers.length + 1).toString(),
    firstName,
    lastName,
    email,
    role,
    grade,
    subjects: []
  };
  
  mockUsers.push(newUser);
  
  res.status(201).json({
    message: 'User registered successfully',
    token: 'mock-jwt-token-' + newUser.id,
    user: newUser
  });
});

app.get('/api/auth/me', (req, res) => {
  // Mock authenticated user
  const user = mockUsers[0];
  res.json({ user });
});

// Courses routes
app.get('/api/courses', (req, res) => {
  res.json({
    courses: mockCourses,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCourses: mockCourses.length,
      hasNext: false,
      hasPrev: false
    }
  });
});

app.get('/api/courses/:id', (req, res) => {
  const course = mockCourses.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.json({ course });
});

// Users routes
app.get('/api/users/profile/:id', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user });
});

// Analytics routes
app.get('/api/analytics/dashboard', (req, res) => {
  res.json({
    analytics: {
      totalCourses: mockCourses.length,
      totalStudents: mockUsers.filter(u => u.role === 'student').length,
      totalTeachers: mockUsers.filter(u => u.role === 'teacher').length,
      averageRating: 4.8
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 E-Math-Sci School Platform Backend`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
});
