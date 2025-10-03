import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">E-Math-Sci School</h1>
          <p className="hero-subtitle">Enhancing math and science lovers to high heights</p>
          <p className="hero-description">
            Empowering students with world-class education in mathematics and science through innovative teaching methods and cutting-edge technology.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Apply Now</Link>
            <Link to="/programs" className="btn-secondary">Explore Programs</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-visual">
            <div className="floating-card">
              <h3>🎓 500+ Students</h3>
              <p>Successfully graduated</p>
            </div>
            <div className="floating-card">
              <h3>👨‍🏫 50+ Teachers</h3>
              <p>Expert educators</p>
            </div>
            <div className="floating-card">
              <h3>📚 100+ Courses</h3>
              <p>Comprehensive curriculum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <div className="container">
          <h2 className="section-title">Get Started Today</h2>
          <div className="quick-links-grid">
            <Link to="/register" className="quick-link-card">
              <div className="icon">📝</div>
              <h3>Apply Now</h3>
              <p>Start your learning journey with us</p>
            </Link>
            <Link to="/programs" className="quick-link-card">
              <div className="icon">🎓</div>
              <h3>Explore Programs</h3>
              <p>Discover our amazing courses</p>
            </Link>
            <Link to="/contact" className="quick-link-card">
              <div className="icon">📞</div>
              <h3>Contact Us</h3>
              <p>Get in touch with our team</p>
            </Link>
            <Link to="/portal" className="quick-link-card">
              <div className="icon">💻</div>
              <h3>Student Portal</h3>
              <p>Access your learning resources</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Highlights */}
      <section className="highlights">
        <div className="container">
          <h2 className="section-title">Why Choose E-Math-Sci School?</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">🏆</div>
              <h3>Excellence in Education</h3>
              <p>Consistently ranked among the top schools for math and science education with proven track record of student success.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">👨‍🏫</div>
              <h3>Expert Faculty</h3>
              <p>Learn from experienced educators and industry professionals who are passionate about teaching and student success.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">💻</div>
              <h3>Modern Technology</h3>
              <p>State-of-the-art facilities and cutting-edge technology to enhance your learning experience.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🌍</div>
              <h3>Global Perspective</h3>
              <p>International curriculum and exchange programs to prepare students for global opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="featured-video">
        <div className="container">
          <h2 className="section-title">See Our School in Action</h2>
          <div className="video-grid">
            <VideoPlayer
              title="Welcome to E-Math-Sci School"
              description="Take a virtual tour of our amazing facilities and see how we're transforming education!"
              duration="3:45"
              className="featured-video-player"
            />
            <VideoPlayer
              title="Student Success Stories"
              description="Hear from our students about their amazing learning journey with us!"
              duration="2:30"
              className="success-video-player"
            />
            <VideoPlayer
              title="Interactive Math Lessons"
              description="See how we make math fun and engaging for students of all ages!"
              duration="4:15"
              className="math-video-player"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="testimonials-preview">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"E-Math-Sci School has transformed my understanding of mathematics. The teachers are amazing!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Grade 8 Student</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The online learning platform is fantastic. I can access everything I need easily!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Michael Chen</h4>
                  <p>Grade 11 Student</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"My daughter loves the interactive lessons and the supportive teachers!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>David Wilson</h4>
                  <p>Parent</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonials-cta">
            <Link to="/testimonials" className="btn-primary">Read More Testimonials</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join thousands of students who are already excelling in math and science with us!</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">Apply Now</Link>
              <Link to="/programs" className="btn-secondary">Explore Programs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
