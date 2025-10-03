import React from 'react';
import styled from 'styled-components';
import { Brain, Trophy, Clock, Target } from 'lucide-react';

const QuizContainer = styled.div`
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
`;

const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const QuizCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const QuizIcon = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
`;

const QuizTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const QuizDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const QuizButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
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
    transform: translateY(-1px);
  }
`;

const StatsSection = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.h3`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const QuizPage: React.FC = () => {
  const quizTypes = [
    {
      title: 'Mathematics Practice',
      description: 'Test your math skills with problems ranging from basic algebra to advanced calculus.',
      icon: Brain,
      color: '#3b82f6'
    },
    {
      title: 'Physics Challenge',
      description: 'Solve physics problems covering mechanics, thermodynamics, and quantum physics.',
      icon: Target,
      color: '#10b981'
    },
    {
      title: 'Chemistry Quiz',
      description: 'Master chemical concepts, reactions, and molecular structures.',
      icon: Trophy,
      color: '#f59e0b'
    },
    {
      title: 'Biology Test',
      description: 'Explore cellular biology, genetics, and evolutionary concepts.',
      icon: Clock,
      color: '#ef4444'
    },
  ];

  const stats = [
    { label: 'Quizzes Completed', value: '24' },
    { label: 'Average Score', value: '85%' },
    { label: 'Current Streak', value: '7 days' },
    { label: 'Total Points', value: '1,250' },
  ];

  return (
    <QuizContainer>
      <Container>
        <Header>
          <Title>Practice Quizzes</Title>
          <Subtitle>Test your knowledge and improve your skills with interactive quizzes</Subtitle>
        </Header>

        <StatsSection>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatItem key={index}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </StatsSection>

        <QuizGrid>
          {quizTypes.map((quiz, index) => (
            <QuizCard key={index}>
              <QuizIcon color={quiz.color}>
                <quiz.icon size={32} />
              </QuizIcon>
              <QuizTitle>{quiz.title}</QuizTitle>
              <QuizDescription>{quiz.description}</QuizDescription>
              <QuizButton>Start Quiz</QuizButton>
            </QuizCard>
          ))}
        </QuizGrid>
      </Container>
    </QuizContainer>
  );
};

export default QuizPage;
