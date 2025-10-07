import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import StudentPortalPage from './pages/StudentPortalPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentClassesPage from './pages/StudentClassesPage';
import StudentAssignmentsPage from './pages/StudentAssignmentsPage';
import StudentGradesPage from './pages/StudentGradesPage';
import StudentResourcesPage from './pages/StudentResourcesPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProgramsPage from './pages/AdminProgramsPage';
import AdminAddTeacherPage from './pages/AdminAddTeacherPage';
import TeacherLoginPage from './pages/TeacherLoginPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import TeacherUploadPage from './pages/TeacherUploadPage';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/portal" element={<StudentPortalPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<StudentLoginPage />} />
          <Route path="/register" element={<StudentRegisterPage />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/classes" element={<StudentClassesPage />} />
          <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
          <Route path="/student/grades" element={<StudentGradesPage />} />
          <Route path="/student/resources" element={<StudentResourcesPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/programs" element={<AdminProgramsPage />} />
          <Route path="/admin/add-teacher" element={<AdminAddTeacherPage />} />
          <Route path="/teacher-login" element={<TeacherLoginPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
          <Route path="/teacher-upload" element={<TeacherUploadPage />} />
        </Routes>
        
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;