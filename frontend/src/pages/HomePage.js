import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import FloatingMath from '../components/FloatingMath';

const HomePage = () => {
  return (
    <div className="home-page">
      <FloatingMath />
      {/* Video Hero Banner */}
      <section className="video-hero">
        <div className="hero-video-container">
          <video 
            className="hero-video" 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">G'SON INTERNATIONAL ACADEMY</h1>
              <p className="hero-subtitle">Where Math & Science Come Alive!</p>
              <p className="hero-description">
                Join thousands of students who are transforming their futures through our innovative learning approach.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn-hero-primary fun-button">🚀 Start Your Journey</Link>
                <Link to="/programs" className="btn-hero-secondary fun-button">📚 Explore Programs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Image Showcase */}
      <section className="image-showcase">
        <div className="container">
          <h2 className="section-title">Experience Learning Like Never Before</h2>
          <div className="showcase-grid">
            <div className="showcase-item showcase-large">
              <img src="/image1.jpeg" alt="Interactive Learning" className="showcase-img" />
              <div className="showcase-overlay">
                <h3>Interactive Learning</h3>
                <p>Hands-on experiments and real-world applications</p>
                <Link to="/programs" className="showcase-btn">Explore Programs</Link>
              </div>
            </div>
            <div className="showcase-item">
              <div className="video-showcase">
                <video className="showcase-video" controls>
                  <source src="/math.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                  <h3>Mathematics Excellence</h3>
                  <p>Master math concepts with our expert teachers</p>
                  <Link to="/programs" className="showcase-btn">Learn Math</Link>
                </div>
              </div>
            </div>
            <div className="showcase-item">
              <div className="video-showcase">
                <video className="showcase-video" controls>
                  <source src="/science.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                  <h3>Science Discovery</h3>
                  <p>Explore the wonders of science through experiments</p>
                  <Link to="/programs" className="showcase-btn">Explore Science</Link>
                </div>
              </div>
            </div>
            <div className="showcase-item">
              <img src="/image2.jpg" alt="Student Success" className="showcase-img" />
              <div className="showcase-overlay">
                <h3>Student Success</h3>
                <p>Join our community of achievers</p>
                <Link to="/testimonials" className="showcase-btn">Read Success Stories</Link>
              </div>
            </div>
            <div className="showcase-item">
              <div className="video-showcase">
                <video className="showcase-video" controls>
                  <source src="/video2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                  <h3>See Us In Action</h3>
                  <p>Watch our students learn and grow</p>
                  <Link to="/gallery" className="showcase-btn">View Gallery</Link>
                </div>
              </div>
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
              <div className="card-image">
                <img src="/image1.jpeg" alt="Start Learning" className="card-img" />
                <div className="card-overlay">
                  <span className="play-icon">▶️</span>
                </div>
              </div>
              <h3>Start Learning</h3>
              <p>Begin your educational journey with us</p>
            </Link>
            <Link to="/programs" className="quick-link-card">
              <div className="card-image">
                <img src="/image2.jpg" alt="View Programs" className="card-img" />
                <div className="card-overlay">
                  <span className="play-icon">▶️</span>
                </div>
              </div>
              <h3>View Programs</h3>
              <p>Discover our comprehensive curriculum</p>
            </Link>
            <Link to="/contact" className="quick-link-card">
              <div className="card-image">
                <div className="contact-icon">📞</div>
              </div>
              <h3>Get Help</h3>
              <p>Contact our support team</p>
            </Link>
            <Link to="/portal" className="quick-link-card">
              <div className="card-image">
                <div className="portal-icon">💻</div>
              </div>
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

      {/* See Our School in Action */}
      <section className="school-action">
        <div className="container">
          <h2 className="section-title">See Our School in Action</h2>
          <div className="action-videos-grid">
            <div className="action-video-card">
              <div className="video-player-container">
                <video className="action-video" controls>
                  <source src="/video1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="video-info">
                <h3>Welcome to E-School</h3>
                <p>Take a virtual tour of our amazing facilities and see how we're transforming education!</p>
              </div>
            </div>
            
            <div className="action-video-card">
              <div className="video-player-container">
                <video className="action-video" controls>
                  <source src="/video2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="video-info">
                <h3>Student Success Stories</h3>
                <p>Hear from our students about their amazing learning journey with us!</p>
              </div>
            </div>
            
            <div className="action-video-card">
              <div className="video-player-container">
                <video className="action-video" controls>
                  <source src="/math.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="video-info">
                <h3>Interactive Math Lessons</h3>
                <p>See how we make math fun and engaging for students of all ages!</p>
              </div>
            </div>
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
