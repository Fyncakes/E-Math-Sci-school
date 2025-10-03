import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { lessons } from '../data/lessons';

const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('in-person');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const programs = {
    'in-person': [
      {
        id: 1,
        title: 'Elementary Math & Science',
        grade: 'Grades 1-5',
        duration: 'Full Academic Year',
        price: '$500/month',
        features: [
          'Basic arithmetic and problem-solving',
          'Introduction to scientific concepts',
          'Hands-on experiments and activities',
          'Interactive learning games',
          'Progress tracking and reports'
        ],
        description: 'Our elementary program introduces young learners to the fascinating world of mathematics and science through fun, interactive activities and hands-on experiments.',
        video: '🎥 Elementary Program Demo',
        schedule: 'Monday-Friday, 9:00 AM - 3:00 PM',
        capacity: '20 students per class',
        teacher: 'Ms. Sarah Johnson'
      },
      {
        id: 2,
        title: 'Middle School STEM',
        grade: 'Grades 6-8',
        duration: 'Full Academic Year',
        price: '$600/month',
        features: [
          'Advanced mathematics concepts',
          'Physics and chemistry fundamentals',
          'Engineering design projects',
          'Coding and robotics',
          'Science fair preparation'
        ],
        description: 'Designed to build strong foundations in STEM subjects while encouraging critical thinking and problem-solving skills.',
        video: '🎥 Middle School STEM Demo',
        schedule: 'Monday-Friday, 8:30 AM - 3:30 PM',
        capacity: '25 students per class',
        teacher: 'Dr. Michael Chen'
      },
      {
        id: 3,
        title: 'High School Advanced',
        grade: 'Grades 9-12',
        duration: 'Full Academic Year',
        price: '$700/month',
        features: [
          'Calculus and advanced mathematics',
          'Advanced physics and chemistry',
          'Research project opportunities',
          'College preparation courses',
          'Mentorship programs'
        ],
        description: 'Prepare for college and beyond with our comprehensive high school program that covers advanced topics and research opportunities.',
        video: '🎥 High School Advanced Demo',
        schedule: 'Monday-Friday, 8:00 AM - 4:00 PM',
        capacity: '30 students per class',
        teacher: 'Prof. Emily Williams'
      }
    ],
    'online': [
      {
        id: 4,
        title: 'Online Math Mastery',
        grade: 'All Grades',
        duration: 'Flexible Schedule',
        price: '$300/month',
        features: [
          'Self-paced learning modules',
          'Interactive video lessons',
          'Live online tutoring sessions',
          'Digital practice exercises',
          'Progress analytics dashboard'
        ],
        description: 'Learn mathematics at your own pace with our comprehensive online platform featuring interactive lessons and personalized support.',
        video: '🎥 Online Math Demo',
        schedule: 'Flexible - Access 24/7',
        capacity: 'Unlimited',
        teacher: 'AI + Live Instructors'
      },
      {
        id: 5,
        title: 'Virtual Science Lab',
        grade: 'Grades 6-12',
        duration: 'Flexible Schedule',
        price: '$350/month',
        features: [
          'Virtual laboratory simulations',
          'Interactive science experiments',
          'Live lab sessions with teachers',
          'Digital lab reports',
          'Science project guidance'
        ],
        description: 'Experience the excitement of science through our virtual laboratory platform with realistic simulations and hands-on activities.',
        video: '🎥 Virtual Science Lab Demo',
        schedule: 'Flexible - Access 24/7',
        capacity: 'Unlimited',
        teacher: 'Dr. Lisa Rodriguez'
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
                    <button className="btn-outline">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Lessons */}
      <section className="sample-lessons">
        <div className="container">
          <h2 className="section-title">Sample Lessons</h2>
          
          <div className="lesson-filters">
            <button 
              className={`filter-btn ${selectedSubject === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSubject('all')}
            >
              All Subjects
            </button>
            <button 
              className={`filter-btn ${selectedSubject === 'mathematics' ? 'active' : ''}`}
              onClick={() => setSelectedSubject('mathematics')}
            >
              Mathematics
            </button>
            <button 
              className={`filter-btn ${selectedSubject === 'science' ? 'active' : ''}`}
              onClick={() => setSelectedSubject('science')}
            >
              Science
            </button>
            <button 
              className={`filter-btn ${selectedSubject === 'physics' ? 'active' : ''}`}
              onClick={() => setSelectedSubject('physics')}
            >
              Physics
            </button>
            <button 
              className={`filter-btn ${selectedSubject === 'chemistry' ? 'active' : ''}`}
              onClick={() => setSelectedSubject('chemistry')}
            >
              Chemistry
            </button>
          </div>
          
          <div className="lessons-grid">
            {filteredLessons.map(lesson => (
              <div key={lesson.id} className="lesson-card">
                <div className="lesson-header">
                  <h3>{lesson.title}</h3>
                  <div className="lesson-meta">
                    <span className="subject">{lesson.subject}</span>
                    <span className="grade">{lesson.grade}</span>
                    <span className="difficulty">{lesson.difficulty}</span>
                  </div>
                </div>
                
                <div className="lesson-content">
                  <p className="lesson-description">{lesson.description}</p>
                  
                  <div className="lesson-objectives">
                    <h4>Learning Objectives:</h4>
                    <ul>
                      {lesson.objectives.slice(0, 3).map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="lesson-details">
                    <div className="detail">
                      <span className="icon">⏱️</span>
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="detail">
                      <span className="icon">📚</span>
                      <span>{lesson.subject}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lesson-actions">
                  <button className="btn-primary">View Lesson</button>
                  <button className="btn-outline">Preview</button>
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
    </div>
  );
};

export default ProgramsPage;