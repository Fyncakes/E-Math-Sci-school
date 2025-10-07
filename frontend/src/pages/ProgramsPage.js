import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import PDFViewer from '../components/PDFViewer';
import { lessons } from '../data/lessons';

const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('in-person');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedPDF, setSelectedPDF] = useState(null);

  const programs = {
    'in-person': [
      {
        id: 1,
        title: 'Mathematics Program',
        grade: 'All Grades',
        duration: 'Full Academic Year',
        price: '$500/month',
        features: [
          'Comprehensive math curriculum aligned with national standards',
          'Vertical alignment from elementary to high school',
          'Problem-solving and critical thinking development',
          'Individual and group learning activities',
          'Progress tracking and assessment'
        ],
        description: 'Our mathematics program follows a vertically aligned curriculum that builds mathematical understanding progressively from basic concepts to advanced applications.',
        curriculum: '/curriculum/Copy of Maths Vertical Alignment_.pdf',
        schedule: 'Monday-Friday, 9:00 AM - 3:00 PM',
        capacity: '25 students per class',
        teacher: 'Mathematics Department'
      },
      {
        id: 2,
        title: 'Sciences Program',
        grade: 'All Grades',
        duration: 'Full Academic Year',
        price: '$550/month',
        features: [
          'Integrated science curriculum covering all disciplines',
          'Hands-on laboratory experiences',
          'Scientific method and inquiry-based learning',
          'Real-world applications and connections',
          'STEM project development'
        ],
        description: 'Our comprehensive sciences program provides students with a deep understanding of scientific principles through inquiry-based learning and practical applications.',
        curriculum: '/curriculum/Sciences Vertical Alignment_.pdf',
        schedule: 'Monday-Friday, 8:30 AM - 3:30 PM',
        capacity: '20 students per class',
        teacher: 'Sciences Department'
      },
      {
        id: 3,
        title: 'English Grammar Program',
        grade: 'All Grades',
        duration: 'Full Academic Year',
        price: '$450/month',
        features: [
          'Structured grammar instruction across all grade levels',
          'Writing skills development and enhancement',
          'Reading comprehension and analysis',
          'Communication and presentation skills',
          'Language arts integration'
        ],
        description: 'Our English Grammar program provides systematic instruction in language arts, helping students develop strong communication skills and literary appreciation.',
        curriculum: '/curriculum/English_Grammar Vertical Alignment_.pdf',
        schedule: 'Monday-Friday, 8:00 AM - 4:00 PM',
        capacity: '30 students per class',
        teacher: 'English Department'
      }
    ],
    'online': [
      {
        id: 4,
        title: 'Online Mathematics Support',
        grade: 'All Grades',
        duration: 'Flexible Schedule',
        price: '$300/month',
        features: [
          'Access to complete math curriculum online',
          'Interactive problem-solving sessions',
          'Virtual tutoring and support',
          'Digital practice exercises and assessments',
          'Progress tracking and analytics'
        ],
        description: 'Supplement your in-person learning with our comprehensive online mathematics support program, available 24/7.',
        curriculum: '/curriculum/Copy of Maths Vertical Alignment_.pdf',
        schedule: 'Flexible - Access 24/7',
        capacity: 'Unlimited',
        teacher: 'Online Mathematics Team'
      },
      {
        id: 5,
        title: 'Virtual Science Lab',
        grade: 'All Grades',
        duration: 'Flexible Schedule',
        price: '$350/month',
        features: [
          'Virtual laboratory simulations',
          'Interactive science experiments',
          'Online science curriculum access',
          'Digital lab reports and assessments',
          'Science project guidance and support'
        ],
        description: 'Experience the excitement of science through our virtual laboratory platform with realistic simulations and hands-on activities.',
        curriculum: '/curriculum/Sciences Vertical Alignment_.pdf',
        schedule: 'Flexible - Access 24/7',
        capacity: 'Unlimited',
        teacher: 'Virtual Sciences Team'
      }
    ]
  };

  const filteredLessons = selectedSubject === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.subject.toLowerCase() === selectedSubject.toLowerCase());

  return (
    <div className="programs-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Our Programs</h1>
          <p>Discover our comprehensive range of math and science programs designed for every learning style</p>
        </div>
      </section>

      {/* Program Tabs */}
      <section className="program-tabs">
        <div className="container">
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'in-person' ? 'active' : ''}`}
              onClick={() => setActiveTab('in-person')}
            >
              🏫 In-Person Programs
            </button>
            <button 
              className={`tab-btn ${activeTab === 'online' ? 'active' : ''}`}
              onClick={() => setActiveTab('online')}
            >
              💻 Online Programs
            </button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="programs-content">
        <div className="container">
          <div className="programs-grid">
            {programs[activeTab].map(program => (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <h3>{program.title}</h3>
                  <div className="program-meta">
                    <span className="grade">{program.grade}</span>
                    <span className="duration">{program.duration}</span>
                  </div>
                </div>
                
                <div className="program-video">
                  <VideoPlayer
                    title={program.title}
                    description={program.description}
                    duration="3:45"
                    className="program-video-player"
                  />
                </div>
                
                <div className="program-description">
                  <p>{program.description}</p>
                </div>
                
                <div className="program-details">
                  <div className="detail-item">
                    <span className="detail-label">📅 Schedule:</span>
                    <span className="detail-value">{program.schedule}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">👥 Capacity:</span>
                    <span className="detail-value">{program.capacity}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">👨‍🏫 Teacher:</span>
                    <span className="detail-value">{program.teacher}</span>
                  </div>
                </div>
                
                <div className="program-features">
                  <h4>What's Included:</h4>
                  <ul>
                    {program.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="program-footer">
                  <div className="price">{program.price}</div>
                  <div className="program-actions">
                    <Link to="/register" className="btn-primary">Enroll Now</Link>
                    <button 
                      className="btn-outline"
                      onClick={() => setSelectedPDF({
                        url: program.curriculum,
                        title: `${program.title} Curriculum`
                      })}
                    >
                      📄 View Curriculum
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* Curriculum Overview */}
          <section className="curriculum-overview">
            <div className="container">
              <h2 className="section-title">Our Teaching Approach</h2>
              <div className="curriculum-grid">
                <div className="curriculum-card">
                  <div className="curriculum-icon">🎯</div>
                  <h3>Personalized Learning</h3>
                  <p>Each student receives individualized attention and learning plans tailored to their unique needs and learning style.</p>
                </div>
                <div className="curriculum-card">
                  <div className="curriculum-icon">🤝</div>
                  <h3>Collaborative Learning</h3>
                  <p>Students work together on projects and problem-solving activities to develop teamwork and communication skills.</p>
                </div>
                <div className="curriculum-card">
                  <div className="curriculum-icon">🔬</div>
                  <h3>Hands-on Experience</h3>
                  <p>Learning through experimentation and real-world applications to make concepts more engaging and memorable.</p>
                </div>
                <div className="curriculum-card">
                  <div className="curriculum-icon">📊</div>
                  <h3>Progress Tracking</h3>
                  <p>Regular assessments and progress reports to ensure students are meeting their learning goals.</p>
                </div>
              </div>
            </div>
          </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Choose the program that's right for you and begin your path to academic excellence!</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">Enroll Now</Link>
              <Link to="/contact" className="btn-secondary">Schedule a Visit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <PDFViewer
          pdfUrl={selectedPDF.url}
          title={selectedPDF.title}
          onClose={() => setSelectedPDF(null)}
        />
      )}
    </div>
  );
};

export default ProgramsPage;