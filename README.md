# E-Math-Sci School Platform

A comprehensive, professional math and science education platform built with modern web technologies. This platform provides an engaging learning environment for students and powerful tools for educators.

## 🚀 Features

### For Students
- **Interactive Course Catalog**: Browse and enroll in math and science courses
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Assignment Management**: Submit and track assignments with real-time feedback
- **Practice Quizzes**: Test your knowledge with interactive quizzes
- **Mobile-Friendly**: Fully responsive design for learning on any device

### For Teachers
- **Course Creation**: Build comprehensive courses with multimedia content
- **Student Management**: Track student progress and engagement
- **Assignment Tools**: Create and grade assignments with automated features
- **Analytics Dashboard**: Get insights into student performance

### For Administrators
- **User Management**: Manage students, teachers, and system settings
- **Platform Analytics**: Monitor platform usage and performance
- **Content Moderation**: Review and approve course content

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Socket.io** for real-time features

### Frontend
- **React 18** with TypeScript
- **Styled Components** for styling
- **React Router** for navigation
- **React Query** for data fetching
- **React Hook Form** for form management
- **Framer Motion** for animations

### Database
- **MongoDB** for data storage
- **Mongoose** for data modeling and validation

## 📁 Project Structure

```
E-Math-Sci-school/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── controllers/     # Business logic
│   └── utils/           # Utility functions
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Utility functions
│   │   └── styles/      # Styling files
│   └── public/          # Static assets
├── database/            # Database scripts
└── docs/               # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fyncakes/E-Math-Sci-school.git
   cd E-Math-Sci-school
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend environment
   cp backend/env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Frontend environment
   cp frontend/env.example frontend/.env
   # Edit frontend/.env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   
   # Or start them separately:
   # Backend (runs on port 5000)
   cd backend && npm run dev
   
   # Frontend (runs on port 3000)
   cd frontend && npm start
   ```

## 🔧 Configuration

### Backend Configuration (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/e-math-sci-school
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=E-Math-Sci School
REACT_APP_VERSION=1.0.0
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create new course
- `POST /api/courses/:id/enroll` - Enroll in course

### Assignment Endpoints
- `GET /api/assignments` - Get assignments
- `POST /api/assignments` - Create assignment
- `POST /api/assignments/:id/submit` - Submit assignment

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Dark/Light Theme**: User preference support
- **Accessibility**: WCAG 2.1 compliant
- **Performance**: Optimized for fast loading

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API rate limiting protection
- **CORS Configuration**: Proper cross-origin setup

## 📱 Mobile Features

- **Progressive Web App**: Installable on mobile devices
- **Touch-Friendly**: Optimized for touch interactions
- **Offline Support**: Basic offline functionality
- **Push Notifications**: Real-time updates

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

# Run all tests
npm run test
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# Start production server
cd backend && npm start
```

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@emathsci.edu
- Documentation: [docs.emathsci.edu](https://docs.emathsci.edu)

## 🎯 Roadmap

- [ ] Video streaming integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered tutoring
- [ ] Gamification features
- [ ] Multi-language support

---

**Built with ❤️ for the future of education**