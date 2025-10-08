import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, FaRocket, FaUsers, FaAward, FaBook, FaLightbulb, 
  FaHeart, FaStar, FaTrophy, FaGlobe, FaHandshake, FaChartLine, 
  FaBullseye, FaChalkboardTeacher, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaEye, FaComment, FaThumbsUp, FaUser, FaCalendar, FaGraduationCap as FaGrad
} from 'react-icons/fa';

const AboutPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        if (response.ok) {
          const data = await response.json();
          setTeachers(data);
        } else {
          // Fallback to demo data if API fails
          setTeachers([
            {
              id: 1,
              name: "Peter Omara",
              title: "Senior Mathematics & Physics Teacher",
              subjects: ["Mathematics", "Physics"],
              experience: "15+ years",
              education: "MSc Applied Mathematics, BSc Physics",
              bio: "Peter Omara is a distinguished educator with over 15 years of experience in teaching mathematics and physics. He specializes in making complex mathematical concepts accessible to students through innovative teaching methods and real-world applications.",
              email: "peter.omara@gsonschool.edu",
              phone: "+254 700 123 456",
              rating: 4.9,
              studentsTaught: 2000,
              achievements: ["Best Teacher Award 2023", "Student Excellence Recognition"],
              specialties: ["Calculus", "Algebra", "Mechanics", "Thermodynamics"],
              image: "/api/placeholder/300/300"
            },
            {
              id: 2,
              name: "Dr. Sarah Chen",
              title: "Head of Science Department",
              subjects: ["Chemistry", "Biology"],
              experience: "12+ years",
              education: "PhD Chemistry, MSc Biology",
              bio: "Dr. Sarah Chen brings real-world research experience to the classroom, having worked in pharmaceutical research before transitioning to education.",
              email: "sarah.chen@gsonschool.edu",
              phone: "+254 700 234 567",
              rating: 4.8,
              studentsTaught: 1500,
              achievements: ["Research Excellence Award", "Innovation in Teaching"],
              specialties: ["Organic Chemistry", "Molecular Biology", "Research Methods"],
              image: "/api/placeholder/300/300"
            },
            {
              id: 3,
              name: "Mr. David Lee",
              title: "Computer Science Teacher",
              subjects: ["Computer Science", "Programming"],
              experience: "10+ years",
              education: "MSc Computer Science, BSc Software Engineering",
              bio: "Mr. David Lee is passionate about preparing students for the digital future through hands-on programming and computer science education.",
              email: "david.lee@gsonschool.edu",
              phone: "+254 700 345 678",
              rating: 4.7,
              studentsTaught: 1200,
              achievements: ["Tech Innovation Award", "Student Project Excellence"],
              specialties: ["Python Programming", "Web Development", "Data Structures"],
              image: "/api/placeholder/300/300"
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
        // Use demo data as fallback
        setTeachers([
          {
            id: 1,
            name: "Peter Omara",
            title: "Senior Mathematics & Physics Teacher",
            subjects: ["Mathematics", "Physics"],
            experience: "15+ years",
            education: "MSc Applied Mathematics, BSc Physics",
            bio: "Peter Omara is a distinguished educator with over 15 years of experience in teaching mathematics and physics. He specializes in making complex mathematical concepts accessible to students through innovative teaching methods and real-world applications.",
            email: "peter.omara@gsonschool.edu",
            phone: "+254 700 123 456",
            rating: 4.9,
            studentsTaught: 2000,
            achievements: ["Best Teacher Award 2023", "Student Excellence Recognition"],
            specialties: ["Calculus", "Algebra", "Mechanics", "Thermodynamics"],
            image: "/api/placeholder/300/300"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowTeacherModal(true);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaGraduationCap />
              <span>Established 2020</span>
            </div>
            <h1>About G'SON INTERNATIONAL ACADEMY</h1>
            <p className="hero-subtitle">
              Empowering the next generation of innovators through exceptional mathematics and science education
            </p>
          </div>
        </div>
      </section>

      {/* School Overview */}
      <section className="school-overview">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <FaRocket />
              <span>Excellence in Education</span>
            </div>
            <h2>Why Choose G'SON INTERNATIONAL ACADEMY?</h2>
            <p className="section-subtitle">
              We're committed to providing world-class education through our exceptional faculty and innovative teaching methods
            </p>
          </div>
          
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-icon">
                <FaChalkboardTeacher />
              </div>
              <h3>Expert Faculty</h3>
              <p>Our teachers hold advanced degrees and have years of teaching experience in their respective fields.</p>
            </div>
            
            <div className="overview-card">
              <div className="overview-icon">
                <FaLightbulb />
              </div>
              <h3>Innovative Methods</h3>
              <p>We use cutting-edge teaching techniques and technology to make learning engaging and effective.</p>
            </div>
            
            <div className="overview-card">
              <div className="overview-icon">
                <FaTrophy />
              </div>
              <h3>Proven Results</h3>
              <p>Our students consistently achieve outstanding results in national and international competitions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Teachers */}
      <section className="our-teachers">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <FaChalkboardTeacher />
              <span>Meet Our Faculty</span>
            </div>
            <h2>Our Expert Teachers</h2>
            <p className="section-subtitle">
              Learn from experienced educators who are passionate about your success
            </p>
          </div>
          
          {loading ? (
            <div className="loading-section">
              <div className="spinner"></div>
              <p>Loading our amazing teachers...</p>
            </div>
          ) : (
            <div className="teachers-grid">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="teacher-card" onClick={() => handleTeacherClick(teacher)}>
                  <div className="teacher-image">
                    <img src={teacher.image} alt={teacher.name} />
                    <div className="teacher-overlay">
                      <FaEye />
                      <span>View Profile</span>
                    </div>
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p className="teacher-title">{teacher.title}</p>
                    <div className="teacher-subjects">
                      {teacher.subjects.map((subject, index) => (
                        <span key={index} className="subject-tag">{subject}</span>
                      ))}
                    </div>
                    <div className="teacher-stats">
                      <div className="stat">
                        <FaStar />
                        <span>{teacher.rating}</span>
                      </div>
                      <div className="stat">
                        <FaUsers />
                        <span>{teacher.studentsTaught}+ students</span>
                      </div>
                      <div className="stat">
                        <FaCalendar />
                        <span>{teacher.experience}</span>
                      </div>
                    </div>
                    <button className="review-btn">
                      <FaComment />
                      Leave a Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Teacher Modal */}
      {showTeacherModal && selectedTeacher && (
        <div className="teacher-modal-overlay" onClick={() => setShowTeacherModal(false)}>
          <div className="teacher-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="teacher-modal-image">
                <img src={selectedTeacher.image} alt={selectedTeacher.name} />
              </div>
              <div className="teacher-modal-info">
                <h2>{selectedTeacher.name}</h2>
                <p className="teacher-modal-title">{selectedTeacher.title}</p>
                <div className="teacher-modal-rating">
                  <FaStar />
                  <span>{selectedTeacher.rating}/5.0</span>
                  <span className="rating-text">({selectedTeacher.studentsTaught}+ students taught)</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowTeacherModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="teacher-details">
                <div className="detail-section">
                  <h3>About {selectedTeacher.name ? selectedTeacher.name.split(' ')[0] : 'Teacher'}</h3>
                  <p>{selectedTeacher.bio}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Education & Experience</h3>
                  <p><strong>Education:</strong> {selectedTeacher.education}</p>
                  <p><strong>Experience:</strong> {selectedTeacher.experience}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Specialties</h3>
                  <div className="specialties-list">
                    {selectedTeacher.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h3>Achievements</h3>
                  <ul className="achievements-list">
                    {selectedTeacher.achievements.map((achievement, index) => (
                      <li key={index}><FaAward /> {achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h3>Contact Information</h3>
                  <div className="contact-info">
                    <div className="contact-item">
                      <FaEnvelope />
                      <span>{selectedTeacher.email}</span>
                    </div>
                    <div className="contact-item">
                      <FaPhone />
                      <span>{selectedTeacher.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="teacher-reviews">
                <h3>Student Reviews</h3>
                <div className="reviews-section">
                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <FaUser />
                        <span>Student A</span>
                      </div>
                      <div className="review-rating">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                    <p className="review-text">
                      "Mr. {selectedTeacher.name ? selectedTeacher.name.split(' ')[0] : 'Teacher'} is an amazing teacher! He makes complex concepts easy to understand."
                    </p>
                    <div className="review-actions">
                      <button className="helpful-btn">
                        <FaThumbsUp />
                        Helpful
                      </button>
                    </div>
                  </div>
                  
                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <FaUser />
                        <span>Student B</span>
                      </div>
                      <div className="review-rating">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                    <p className="review-text">
                      "Excellent teaching methods and very patient with students. Highly recommended!"
                    </p>
                    <div className="review-actions">
                      <button className="helpful-btn">
                        <FaThumbsUp />
                        Helpful
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="add-review">
                  <h4>Leave a Review</h4>
                  <form className="review-form">
                    <div className="form-group">
                      <label>Your Rating</label>
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="rating-star" />
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Your Review</label>
                      <textarea placeholder="Share your experience with this teacher..."></textarea>
                    </div>
                    <button type="submit" className="submit-review-btn">
                      <FaComment />
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AboutPage;