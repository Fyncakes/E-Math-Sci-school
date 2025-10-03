import React from 'react';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <header style={{ 
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
        color: 'white', 
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          📚 E-Math-Sci School
        </h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
          Enhancing math and science lovers to high heights
        </p>
      </header>
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '1rem', 
          padding: '2rem', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>
            Welcome to E-Math-Sci School!
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Your comprehensive platform for math and science education. 
            Explore courses, take quizzes, track your progress, and enhance your learning journey.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <div style={{ 
              background: '#f3f4f6', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>🎓 Courses</h3>
              <p style={{ color: '#6b7280' }}>Browse comprehensive math and science courses</p>
            </div>
            
            <div style={{ 
              background: '#f3f4f6', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>📝 Assignments</h3>
              <p style={{ color: '#6b7280' }}>Submit and track your assignments</p>
            </div>
            
            <div style={{ 
              background: '#f3f4f6', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>🧠 Quizzes</h3>
              <p style={{ color: '#6b7280' }}>Test your knowledge with interactive quizzes</p>
            </div>
            
            <div style={{ 
              background: '#f3f4f6', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>📊 Analytics</h3>
              <p style={{ color: '#6b7280' }}>Track your learning progress</p>
            </div>
          </div>
        </div>
        
        <div style={{ 
          background: '#10b981', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.75rem',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>🚀 Ready to Start Learning?</h3>
          <p style={{ marginBottom: '1rem' }}>
            The E-Math-Sci School platform is now running successfully!
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: 'white',
              color: '#10b981',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Explore Courses
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Take Quiz
            </button>
          </div>
        </div>
      </main>
      
      <footer style={{ 
        background: '#1f2937', 
        color: 'white', 
        padding: '2rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <p>&copy; 2024 E-Math-Sci School. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
          Built with React, Node.js, and MongoDB
        </p>
      </footer>
    </div>
  );
}

export default App;