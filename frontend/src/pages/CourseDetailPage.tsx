import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Users, Star, CheckCircle, BookOpen } from 'lucide-react';

const CourseDetailContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing['2xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSizes.lg};

  &:hover {
    text-decoration: underline;
  }
`;

const CourseHeader = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['3xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
`;

const CourseTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.gray[600]};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const CourseDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[700]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const EnrollButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing['2xl']};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - in real app, this would come from API
  const course = {
    id: '1',
    title: 'Advanced Calculus',
    description: 'Master differential and integral calculus with real-world applications. This comprehensive course covers limits, derivatives, integrals, and their applications in various fields including physics, engineering, and economics.',
    subject: 'mathematics',
    grade: '12',
    difficulty: 'advanced',
    duration: 12,
    rating: 4.8,
    students: 1250,
    price: 0,
    isFree: true,
    instructor: 'Dr. Sarah Johnson',
    modules: [
      { title: 'Introduction to Calculus', lessons: 5, duration: 120 },
      { title: 'Limits and Continuity', lessons: 8, duration: 180 },
      { title: 'Derivatives', lessons: 12, duration: 240 },
      { title: 'Applications of Derivatives', lessons: 10, duration: 200 },
      { title: 'Integrals', lessons: 15, duration: 300 },
      { title: 'Applications of Integrals', lessons: 8, duration: 160 },
    ]
  };

  return (
    <CourseDetailContainer>
      <Container>
        <BackButton>
          <ArrowLeft size={20} />
          Back to Courses
        </BackButton>

        <CourseHeader>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseMeta>
            <MetaItem>
              <BookOpen size={20} />
              {course.subject.charAt(0).toUpperCase() + course.subject.slice(1)}
            </MetaItem>
            <MetaItem>
              <Clock size={20} />
              {course.duration} weeks
            </MetaItem>
            <MetaItem>
              <Users size={20} />
              {course.students.toLocaleString()} students
            </MetaItem>
            <MetaItem>
              <Star size={20} />
              {course.rating} rating
            </MetaItem>
          </CourseMeta>
          <CourseDescription>{course.description}</CourseDescription>
          <EnrollButton>
            <Play size={20} />
            {course.isFree ? 'Start Free Course' : `Enroll for $${course.price}`}
          </EnrollButton>
        </CourseHeader>

        {/* Course content would go here */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h2>Course Content</h2>
          <p>Course modules and lessons would be displayed here...</p>
        </div>
      </Container>
    </CourseDetailContainer>
  );
};

export default CourseDetailPage;
