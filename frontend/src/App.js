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
import UniversalLoginPage from './pages/UniversalLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentClassesPage from './pages/StudentClassesPage';
import StudentAssignmentsPage from './pages/StudentAssignmentsPage';
import StudentGradesPage from './pages/StudentGradesPage';
import StudentResourcesPage from './pages/StudentResourcesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProgramsPage from './pages/AdminProgramsPage';
import AdminAddTeacherPage from './pages/AdminAddTeacherPage';
import AdminTeacherManagementPage from './pages/AdminTeacherManagementPage';
import TeacherViewPage from './pages/TeacherViewPage';
import TeacherEditPage from './pages/TeacherEditPage';
import AdminCreateCoursePage from './pages/AdminCreateCoursePage';
import AdminCreateAssignmentPage from './pages/AdminCreateAssignmentPage';
import AdminEditCoursePage from './pages/AdminEditCoursePage';
import AdminViewCoursePage from './pages/AdminViewCoursePage';
import AdminEditAssignmentPage from './pages/AdminEditAssignmentPage';
import AdminAdmissionsPage from './pages/AdminAdmissionsPage';
import TeacherLoginPage from './pages/TeacherLoginPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import TeacherUploadPage from './pages/TeacherUploadPage';
import StudentAdmissionStatusPage from './pages/StudentAdmissionStatusPage';
import ApprovedStudentsPage from './pages/ApprovedStudentsPage';
import ParentDashboardPage from './pages/ParentDashboardPage';
import AdminAddStudentPage from './pages/AdminAddStudentPage';
import AdminImportStudentsPage from './pages/AdminImportStudentsPage';
import AdminExportDataPage from './pages/AdminExportDataPage';

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
          <Route path="/login" element={<UniversalLoginPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/register" element={<StudentRegisterPage />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/classes" element={<StudentClassesPage />} />
          <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
          <Route path="/student/grades" element={<StudentGradesPage />} />
          <Route path="/student/resources" element={<StudentResourcesPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/programs" element={<AdminProgramsPage />} />
          <Route path="/admin/add-teacher" element={<AdminAddTeacherPage />} />
          <Route path="/admin/teachers" element={<AdminTeacherManagementPage />} />
          <Route path="/admin/teachers/view/:id" element={<TeacherViewPage />} />
          <Route path="/admin/teachers/edit/:id" element={<TeacherEditPage />} />
          <Route path="/admin/create-course" element={<AdminCreateCoursePage />} />
          <Route path="/admin/create-assignment" element={<AdminCreateAssignmentPage />} />
          <Route path="/admin/edit-course/:id" element={<AdminEditCoursePage />} />
          <Route path="/admin/view-course/:id" element={<AdminViewCoursePage />} />
          <Route path="/admin/edit-assignment/:id" element={<AdminEditAssignmentPage />} />
          <Route path="/admin/admissions" element={<AdminAdmissionsPage />} />
          <Route path="/admin/add-student" element={<AdminAddStudentPage />} />
          <Route path="/admin/import-students" element={<AdminImportStudentsPage />} />
          <Route path="/admin/export-data" element={<AdminExportDataPage />} />
          <Route path="/teacher-login" element={<TeacherLoginPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
          <Route path="/teacher-upload" element={<TeacherUploadPage />} />
          <Route path="/parent-dashboard" element={<ParentDashboardPage />} />
          <Route path="/student/admission-status" element={<StudentAdmissionStatusPage />} />
          <Route path="/approved-students" element={<ApprovedStudentsPage />} />
        </Routes>
        
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;