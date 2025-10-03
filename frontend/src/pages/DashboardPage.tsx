import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { BarChart3, BookOpen, Users, Award, TrendingUp, Calendar, Clock } from 'lucide-react';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing['2xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const WelcomeSection = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
`;

const WelcomeTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const WelcomeSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const StatIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  margin-bottom: ${props => props.theme.spacing.md};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

const CourseIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
`;

const CourseInfo = styled.div`
  flex: 1;
`;

const CourseTitle = styled.h4`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const CourseSubject = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: ${props => props.theme.colors.primary};
  transition: width 0.3s ease;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.gray[50]};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ActivityIcon = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ActivityTime = styled.p`
  color: ${props => props.theme.colors.gray[500]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['2xl']};
  color: ${props => props.theme.colors.gray[500]};
`;

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in real app, this would come from API
  const stats = [
    { label: 'Enrolled Courses', value: '5', icon: BookOpen, color: '#3b82f6' },
    { label: 'Completed Assignments', value: '12', icon: Award, color: '#10b981' },
    { label: 'Quiz Score', value: '85%', icon: TrendingUp, color: '#f59e0b' },
    { label: 'Study Streak', value: '7 days', icon: Calendar, color: '#ef4444' },
  ];

  const recentCourses = [
    { title: 'Advanced Calculus', subject: 'Mathematics', progress: 75, color: '#3b82f6' },
    { title: 'Quantum Physics', subject: 'Physics', progress: 60, color: '#10b981' },
    { title: 'Organic Chemistry', subject: 'Chemistry', progress: 40, color: '#f59e0b' },
  ];

  const recentActivity = [
    { title: 'Completed Algebra Quiz', time: '2 hours ago', icon: Award, color: '#10b981' },
    { title: 'New assignment posted', time: '1 day ago', icon: BookOpen, color: '#3b82f6' },
    { title: 'Course progress updated', time: '2 days ago', icon: TrendingUp, color: '#f59e0b' },
  ];

  return (
    <DashboardContainer>
      <Container>
        <WelcomeSection>
          <WelcomeTitle>
            Welcome back, {user?.firstName}!
          </WelcomeTitle>
          <WelcomeSubtitle>
            {user?.role === 'student' 
              ? 'Ready to continue your learning journey?' 
              : 'Ready to help your students succeed?'
            }
          </WelcomeSubtitle>
        </WelcomeSection>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatIcon color={stat.color}>
                <stat.icon size={24} />
              </StatIcon>
              <StatContent>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatContent>
            </StatCard>
          ))}
        </StatsGrid>

        <ContentGrid>
          <Card>
            <CardTitle>Recent Courses</CardTitle>
            {recentCourses.length > 0 ? (
              recentCourses.map((course, index) => (
                <CourseItem key={index}>
                  <CourseIcon color={course.color}>
                    <BookOpen size={20} />
                  </CourseIcon>
                  <CourseInfo>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseSubject>{course.subject}</CourseSubject>
                    <ProgressBar>
                      <ProgressFill progress={course.progress} />
                    </ProgressBar>
                  </CourseInfo>
                </CourseItem>
              ))
            ) : (
              <EmptyState>
                <BookOpen size={48} />
                <p>No courses enrolled yet</p>
              </EmptyState>
            )}
          </Card>

          <Card>
            <CardTitle>Recent Activity</CardTitle>
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <ActivityItem key={index}>
                  <ActivityIcon color={activity.color}>
                    <activity.icon size={16} />
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>{activity.title}</ActivityTitle>
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              ))
            ) : (
              <EmptyState>
                <Clock size={48} />
                <p>No recent activity</p>
              </EmptyState>
            )}
          </Card>
        </ContentGrid>
      </Container>
    </DashboardContainer>
  );
};

export default DashboardPage;
