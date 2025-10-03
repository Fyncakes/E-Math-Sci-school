import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Play,
  Star,
  CheckCircle,
  Calculator,
  Atom,
  Microscope,
  Code,
  Brain
} from 'lucide-react';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['4xl']} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const HeroTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['5xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.1;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  opacity: 0.9;
  line-height: 1.6;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.white};

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
  }
`;

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.gray[900]};
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing['3xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.gray[900]};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const SubjectsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const SubjectCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const SubjectIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
`;

const SubjectTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray[900]};
`;

const StatsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    opacity: 0.9;
  }
`;

const HomePage: React.FC = () => {
  const subjects = [
    { name: 'Mathematics', icon: Calculator, color: '#3b82f6' },
    { name: 'Physics', icon: Atom, color: '#10b981' },
    { name: 'Chemistry', icon: Microscope, color: '#f59e0b' },
    { name: 'Biology', icon: Brain, color: '#ef4444' },
    { name: 'Computer Science', icon: Code, color: '#8b5cf6' },
  ];

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Enhance Your Math & Science Skills
          </HeroTitle>
          <HeroSubtitle>
            Join thousands of students and teachers in our comprehensive 
            learning platform designed to take your math and science 
            knowledge to new heights.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton to="/courses">
              Explore Courses
              <ArrowRight size={20} />
            </PrimaryButton>
            <SecondaryButton to="/register">
              <Play size={20} />
              Get Started
            </SecondaryButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose E-Math-Sci?</SectionTitle>
          <SectionSubtitle>
            Our platform combines cutting-edge technology with proven 
            educational methods to deliver exceptional learning experiences.
          </SectionSubtitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <BookOpen size={32} />
              </FeatureIcon>
              <FeatureTitle>Comprehensive Courses</FeatureTitle>
              <FeatureDescription>
                Access a wide range of math and science courses 
                designed by expert educators for all skill levels.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <Users size={32} />
              </FeatureIcon>
              <FeatureTitle>Expert Instructors</FeatureTitle>
              <FeatureDescription>
                Learn from experienced teachers and industry 
                professionals who are passionate about education.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <Award size={32} />
              </FeatureIcon>
              <FeatureTitle>Interactive Learning</FeatureTitle>
              <FeatureDescription>
                Engage with interactive quizzes, assignments, 
                and hands-on projects that make learning fun.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <TrendingUp size={32} />
              </FeatureIcon>
              <FeatureTitle>Progress Tracking</FeatureTitle>
              <FeatureDescription>
                Monitor your learning journey with detailed 
                analytics and personalized recommendations.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <SubjectsSection>
        <Container>
          <SectionTitle>Explore Our Subjects</SectionTitle>
          <SectionSubtitle>
            From basic concepts to advanced topics, we cover all 
            major areas of mathematics and science.
          </SectionSubtitle>
          <SubjectsGrid>
            {subjects.map((subject, index) => (
              <SubjectCard key={index}>
                <SubjectIcon color={subject.color}>
                  <subject.icon size={24} />
                </SubjectIcon>
                <SubjectTitle>{subject.name}</SubjectTitle>
              </SubjectCard>
            ))}
          </SubjectsGrid>
        </Container>
      </SubjectsSection>

      <StatsSection>
        <Container>
          <StatsGrid>
            <StatItem>
              <h3>10,000+</h3>
              <p>Active Students</p>
            </StatItem>
            <StatItem>
              <h3>500+</h3>
              <p>Expert Teachers</p>
            </StatItem>
            <StatItem>
              <h3>1,000+</h3>
              <p>Courses Available</p>
            </StatItem>
            <StatItem>
              <h3>95%</h3>
              <p>Success Rate</p>
            </StatItem>
          </StatsGrid>
        </Container>
      </StatsSection>
    </>
  );
};

export default HomePage;
