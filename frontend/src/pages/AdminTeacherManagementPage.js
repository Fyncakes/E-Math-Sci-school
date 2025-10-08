import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaGraduationCap, 
  FaUser, FaEnvelope, FaPhone, FaAward, FaBook, FaChalkboardTeacher,
  FaArrowLeft, FaSave, FaTimes, FaCheck, FaExclamationTriangle
} from 'react-icons/fa';

const AdminTeacherManagementPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    subjects: [],
    experience: '',
    education: '',
    bio: '',
    phone: '',
    specialties: [],
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Available subjects and specialties
  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
    'History', 'Geography', 'Computer Science', 'Art', 'Music'
  ];

  const availableSpecialties = [
    'Calculus', 'Algebra', 'Geometry', 'Statistics', 'Mechanics', 
    'Thermodynamics', 'Organic Chemistry', 'Cell Biology', 'Literature',
    'Creative Writing', 'World History', 'Physical Geography', 'Programming',
    'Digital Art', 'Classical Music'
  ];

  // Fetch teachers from API
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/teachers');
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      } else {
        // Fallback to demo data
        setTeachers([
          {
            _id: '1',
            firstName: 'Peter',
            lastName: 'Omara',
            email: 'peter.omara@gsonschool.edu',
            title: 'Senior Mathematics & Physics Teacher',
            subjects: ['Mathematics', 'Physics'],
            experience: '15+ years',
            education: 'MSc Applied Mathematics, BSc Physics',
            bio: 'Peter Omara is a distinguished educator with over 15 years of experience in teaching mathematics and physics.',
            phone: '+254 700 123 456',
            specialties: ['Calculus', 'Algebra', 'Mechanics'],
            image: '/api/placeholder/300/300',
            rating: 4.9,
            studentsTaught: 2000,
            achievements: ['Best Teacher Award 2023', 'Student Excellence Recognition'],
            status: 'active'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setMessage('Error loading teachers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const teacherData = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        rating: 5.0,
        studentsTaught: 0,
        achievements: [],
        status: 'active',
        createdAt: new Date()
      };

      const response = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      });

      if (response.ok) {
        setMessage('Teacher added successfully!');
        setShowAddForm(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          title: '',
          subjects: [],
          experience: '',
          education: '',
          bio: '',
          phone: '',
          specialties: [],
          image: ''
        });
        fetchTeachers();
      } else {
        setMessage('Error adding teacher. Please try again.');
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
      setMessage('Error adding teacher. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      firstName: teacher.firstName || teacher.name?.split(' ')[0] || '',
      lastName: teacher.lastName || teacher.name?.split(' ')[1] || '',
      email: teacher.email || '',
      title: teacher.title || '',
      subjects: teacher.subjects || [],
      experience: teacher.experience || '',
      education: teacher.education || '',
      bio: teacher.bio || '',
      phone: teacher.phone || '',
      specialties: teacher.specialties || [],
      image: teacher.image || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/teachers/${teacherId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage('Teacher deleted successfully!');
          fetchTeachers();
        } else {
          setMessage('Error deleting teacher. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
        setMessage('Error deleting teacher. Please try again.');
      }
    }
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !filterSubject || teacher.subjects?.includes(filterSubject);
    return matchesSearch && matchesSubject;
  });

  if (loading) {
    return (
      <div className="admin-teacher-management-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading teachers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-teacher-management-page">
      <div className="page-header">
        <div className="header-content">
          <Link to="/admin-dashboard" className="back-button">
            <FaArrowLeft />
            Back to Dashboard
          </Link>
          <div className="header-info">
            <h1>Teacher Management</h1>
            <p>Manage your teaching staff and their information</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            <FaCheck />
            {message}
          </div>
        )}

        <div className="management-toolbar">
          <div className="search-filters">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <FaFilter />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {availableSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
          <button 
            className="add-teacher-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus />
            Add Teacher
          </button>
        </div>

        {showAddForm && (
          <div className="add-teacher-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
                <button 
                  className="close-btn"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTeacher(null);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      title: '',
                      subjects: [],
                      experience: '',
                      education: '',
                      bio: '',
                      phone: '',
                      specialties: [],
                      image: ''
                    });
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="teacher-form">
                <div className="form-section">
                  <h3>Basic Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Title/Position *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Mathematics Teacher"
                      required
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Teaching Information</h3>
                  <div className="form-group">
                    <label>Subjects *</label>
                    <div className="checkbox-grid">
                      {availableSubjects.map(subject => (
                        <label key={subject} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={() => handleArrayChange('subjects', subject)}
                          />
                          <span className="checkmark"></span>
                          {subject}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Specialties</label>
                    <div className="checkbox-grid">
                      {availableSpecialties.map(specialty => (
                        <label key={specialty} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.specialties.includes(specialty)}
                            onChange={() => handleArrayChange('specialties', specialty)}
                          />
                          <span className="checkmark"></span>
                          {specialty}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Experience</label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g., 10+ years"
                      />
                    </div>
                    <div className="form-group">
                      <label>Education</label>
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="e.g., MSc Mathematics, BSc Physics"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Additional Information</h3>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us about this teacher's background and teaching philosophy..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Profile Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/teacher-photo.jpg"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingTeacher(null);
                    }}
                  >
                    <FaTimes />
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <FaSave />
                    )}
                    {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="teachers-grid">
          {filteredTeachers.length === 0 ? (
            <div className="no-teachers">
              <FaChalkboardTeacher />
              <h3>No teachers found</h3>
              <p>Try adjusting your search or add a new teacher.</p>
            </div>
          ) : (
            filteredTeachers.map(teacher => (
              <div key={teacher._id} className="teacher-card">
                <div className="teacher-header">
                  <div className="teacher-avatar">
                    {teacher.image ? (
                      <img src={teacher.image} alt={teacher.name} />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name || `${teacher.firstName} ${teacher.lastName}`}</h3>
                    <p className="teacher-title">{teacher.title}</p>
                    <div className="teacher-rating">
                      <FaAward />
                      <span>{teacher.rating || 5.0}/5.0</span>
                    </div>
                  </div>
                </div>
                
                <div className="teacher-details">
                  <div className="detail-item">
                    <FaBook />
                    <span>{teacher.subjects?.join(', ') || 'No subjects assigned'}</span>
                  </div>
                  <div className="detail-item">
                    <FaGraduationCap />
                    <span>{teacher.experience || 'Experience not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <FaEnvelope />
                    <span>{teacher.email}</span>
                  </div>
                  {teacher.phone && (
                    <div className="detail-item">
                      <FaPhone />
                      <span>{teacher.phone}</span>
                    </div>
                  )}
                </div>

                <div className="teacher-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEdit(teacher)}
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(teacher._id)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherManagementPage;
