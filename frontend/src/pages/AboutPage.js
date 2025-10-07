import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About E-Math-Sci School</h1>
          <p>Discover our story, mission, and the people who make our school special</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, E-Math-Sci School was established with a vision to revolutionize mathematics and science education. 
                We believe that every student has the potential to excel in these subjects when provided with the right guidance, 
                resources, and learning environment.
              </p>
              <p>
                Our journey began when a group of passionate educators recognized the need for a more engaging and effective approach 
                to teaching math and science. We wanted to create a place where students could not only learn these subjects but 
                truly fall in love with them.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <div className="placeholder-icon">🏫</div>
                <p>Our Beautiful Campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section className="vision-mission">
        <div className="container">
          <h2 className="section-title">Our Vision, Mission & Values</h2>
          <div className="vmv-grid">
            <div className="vmv-card">
              <div className="vmv-icon">👁️</div>
              <h3>Vision</h3>
              <p>To be the leading institution in mathematics and science education, nurturing the next generation of innovators and problem-solvers who will shape the future.</p>
            </div>
            <div className="vmv-card">
              <div className="vmv-icon">🎯</div>
              <h3>Mission</h3>
              <p>To provide exceptional education in mathematics and science through innovative teaching methods, cutting-edge technology, and personalized learning experiences that inspire lifelong learning.</p>
            </div>
            <div className="vmv-card">
              <div className="vmv-icon">💎</div>
              <h3>Values</h3>
              <ul>
                <li>Excellence in education and student outcomes</li>
                <li>Innovation in teaching and learning methods</li>
                <li>Integrity and ethical conduct</li>
                <li>Respect for diversity and inclusion</li>
                <li>Collaboration and teamwork</li>
                <li>Continuous improvement and growth</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Staff */}
      <section className="leadership">
        <div className="container">
          <h2 className="section-title">Meet Our Leadership Team</h2>
          <div className="leadership-grid">
            <div className="leader-card featured">
              <div className="leader-image">
                <div className="placeholder-avatar">👨‍🏫</div>
              </div>
              <div className="leader-info">
                <h3>Peter Omara</h3>
                <p className="position">Senior Mathematics & Physics Teacher</p>
                <p className="bio">
                  Peter Omara is a distinguished educator with over 15 years of experience in teaching mathematics and physics. 
                  He holds a Master's degree in Applied Mathematics and a Bachelor's in Physics from the University of Nairobi. 
                  Peter specializes in making complex mathematical concepts accessible to students through innovative teaching methods 
                  and real-world applications. His passion for education has helped over 2,000 students achieve excellence in 
                  mathematics and physics, with many going on to pursue careers in engineering, medicine, and research.
                </p>
                <div className="teacher-credentials">
                  <span className="credential">MSc Applied Mathematics</span>
                  <span className="credential">BSc Physics</span>
                  <span className="credential">15+ Years Experience</span>
                </div>
              </div>
            </div>
            <div className="leader-card">
              <div className="leader-image">
                <div className="placeholder-avatar">👨‍💼</div>
              </div>
              <div className="leader-info">
                <h3>Dr. Sarah Williams</h3>
                <p className="position">Principal & Founder</p>
                <p className="bio">With over 20 years in education, Dr. Williams is passionate about making math and science accessible to all students.</p>
              </div>
            </div>
            <div className="leader-card">
              <div className="leader-image">
                <div className="placeholder-avatar">👩‍🔬</div>
              </div>
              <div className="leader-info">
                <h3>Prof. Michael Johnson</h3>
                <p className="position">Head of Science Department</p>
                <p className="bio">A former NASA scientist, Prof. Johnson brings real-world experience to our science curriculum.</p>
              </div>
            </div>
            <div className="leader-card">
              <div className="leader-image">
                <div className="placeholder-avatar">👨‍🏫</div>
              </div>
              <div className="leader-info">
                <h3>Ms. Emily Chen</h3>
                <p className="position">Head of Mathematics</p>
                <p className="bio">Ms. Chen has developed innovative teaching methods that have helped thousands of students excel in mathematics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Excellence */}
      <section className="teaching-excellence">
        <div className="container">
          <h2 className="section-title">Our Teaching Excellence</h2>
          <div className="excellence-grid">
            <div className="excellence-card">
              <div className="excellence-icon">🎓</div>
              <h3>Expert Faculty</h3>
              <p>Our teachers hold advanced degrees in their respective fields and have years of teaching experience.</p>
            </div>
            <div className="excellence-card">
              <div className="excellence-icon">🔬</div>
              <h3>Hands-on Learning</h3>
              <p>We believe in learning by doing, with practical experiments and real-world applications.</p>
            </div>
            <div className="excellence-card">
              <div className="excellence-icon">💡</div>
              <h3>Innovative Methods</h3>
              <p>We use cutting-edge teaching techniques and technology to make learning engaging and effective.</p>
            </div>
            <div className="excellence-card">
              <div className="excellence-icon">🌟</div>
              <h3>Student Success</h3>
              <p>Our students consistently achieve outstanding results in national and international competitions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* School Statistics */}
      <section className="school-stats">
        <div className="container">
          <h2 className="section-title">Our Impact in Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">2,500+</div>
              <div className="stat-label">Students Taught</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Teachers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Awards Won</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Parent Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <p>Become part of our amazing learning community and start your journey to excellence!</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">Apply Now</Link>
              <Link to="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;