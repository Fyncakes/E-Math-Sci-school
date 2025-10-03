import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, BookOpen, Play } from 'lucide-react';

const CoursesContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing['2xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
`;

const SearchSection = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing['2xl']};
  padding-left: ${props => props.theme.spacing['3xl']};
  border: 2px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray[400]};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  min-width: 150px;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const CourseCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CourseImage = styled.div<{ color: string }>`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.color} 0%, ${props => props.color}dd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes['4xl']};
`;

const CourseContent = styled.div`
  padding: ${props => props.theme.spacing['2xl']};
`;

const CourseTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CourseDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.gray[500]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const StarIcon = styled.div<{ filled: boolean }>`
  color: ${props => props.filled ? props.theme.colors.accent : props.theme.colors.gray[300]};
`;

const CourseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`;

const EnrollButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  // Mock data - in real app, this would come from API
  const courses = [
    {
      id: '1',
      title: 'Advanced Calculus',
      description: 'Master differential and integral calculus with real-world applications.',
      subject: 'mathematics',
      grade: '12',
      difficulty: 'advanced',
      duration: 12,
      rating: 4.8,
      students: 1250,
      price: 0,
      isFree: true,
      color: '#3b82f6'
    },
    {
      id: '2',
      title: 'Quantum Physics Fundamentals',
      description: 'Explore the fascinating world of quantum mechanics and its applications.',
      subject: 'physics',
      grade: 'college',
      difficulty: 'advanced',
      duration: 16,
      rating: 4.9,
      students: 890,
      price: 99,
      isFree: false,
      color: '#10b981'
    },
    {
      id: '3',
      title: 'Organic Chemistry Basics',
      description: 'Learn the fundamentals of organic chemistry and molecular structures.',
      subject: 'chemistry',
      grade: '11',
      difficulty: 'intermediate',
      duration: 10,
      rating: 4.6,
      students: 2100,
      price: 0,
      isFree: true,
      color: '#f59e0b'
    },
    {
      id: '4',
      title: 'Cell Biology and Genetics',
      description: 'Understand cellular processes and genetic inheritance patterns.',
      subject: 'biology',
      grade: '10',
      difficulty: 'intermediate',
      duration: 8,
      rating: 4.7,
      students: 1650,
      price: 0,
      isFree: true,
      color: '#ef4444'
    },
    {
      id: '5',
      title: 'Data Structures and Algorithms',
      description: 'Master fundamental computer science concepts and problem-solving techniques.',
      subject: 'computer-science',
      grade: 'college',
      difficulty: 'intermediate',
      duration: 14,
      rating: 4.8,
      students: 3200,
      price: 149,
      isFree: false,
      color: '#8b5cf6'
    },
  ];

  const subjects = [
    { value: '', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer-science', label: 'Computer Science' },
  ];

  const grades = [
    { value: '', label: 'All Grades' },
    { value: '6', label: 'Grade 6' },
    { value: '7', label: 'Grade 7' },
    { value: '8', label: 'Grade 8' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' },
    { value: 'college', label: 'College' },
  ];

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || course.subject === selectedSubject;
    const matchesGrade = !selectedGrade || course.grade === selectedGrade;
    const matchesDifficulty = !selectedDifficulty || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesGrade && matchesDifficulty;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < Math.floor(rating)}>
        <Star size={16} />
      </StarIcon>
    ));
  };

  return (
    <CoursesContainer>
      <Container>
        <Header>
          <Title>Explore Our Courses</Title>
          <Subtitle>
            Discover comprehensive math and science courses designed to enhance your learning journey
          </Subtitle>
        </Header>

        <SearchSection>
          <SearchBar>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <FilterRow>
            <FilterSelect
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              {grades.map(grade => (
                <option key={grade.value} value={grade.value}>
                  {grade.label}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </FilterSelect>
          </FilterRow>
        </SearchSection>

        <CoursesGrid>
          {filteredCourses.map(course => (
            <CourseCard key={course.id}>
              <CourseImage color={course.color}>
                <BookOpen size={48} />
              </CourseImage>
              <CourseContent>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <CourseMeta>
                  <MetaItem>
                    <Clock size={16} />
                    {course.duration} weeks
                  </MetaItem>
                  <MetaItem>
                    <Users size={16} />
                    {course.students.toLocaleString()} students
                  </MetaItem>
                </CourseMeta>
                <Rating>
                  <Stars>
                    {renderStars(course.rating)}
                  </Stars>
                  <span>{course.rating}</span>
                </Rating>
                <CourseFooter>
                  <Price>
                    {course.isFree ? 'Free' : `$${course.price}`}
                  </Price>
                  <EnrollButton to={`/courses/${course.id}`}>
                    <Play size={16} />
                    {course.isFree ? 'Start Free' : 'Enroll Now'}
                  </EnrollButton>
                </CourseFooter>
              </CourseContent>
            </CourseCard>
          ))}
        </CoursesGrid>
      </Container>
    </CoursesContainer>
  );
};

export default CoursesPage;
