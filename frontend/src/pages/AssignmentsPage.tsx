import React from 'react';
import styled from 'styled-components';
import { Calendar, Clock, FileText, CheckCircle } from 'lucide-react';

const AssignmentsContainer = styled.div`
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

const AssignmentsGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
`;

const AssignmentCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const AssignmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AssignmentTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const AssignmentType = styled.span`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const AssignmentDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const AssignmentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.gray[500]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  background: ${props => {
    switch (props.status) {
      case 'completed': return props.theme.colors.success;
      case 'pending': return props.theme.colors.warning;
      case 'overdue': return props.theme.colors.error;
      default: return props.theme.colors.gray[300];
    }
  }};
  color: ${props => props.theme.colors.white};
`;

const AssignmentsPage: React.FC = () => {
  // Mock data - in real app, this would come from API
  const assignments = [
    {
      id: '1',
      title: 'Calculus Problem Set 1',
      description: 'Solve problems involving limits and continuity. Submit your solutions with detailed explanations.',
      type: 'homework',
      dueDate: '2024-10-10',
      status: 'pending',
      course: 'Advanced Calculus',
      points: 100
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      description: 'Write a comprehensive lab report on the pendulum experiment conducted in class.',
      type: 'lab',
      dueDate: '2024-10-08',
      status: 'overdue',
      course: 'Quantum Physics',
      points: 150
    },
    {
      id: '3',
      title: 'Chemistry Quiz',
      description: 'Multiple choice quiz covering organic chemistry fundamentals.',
      type: 'quiz',
      dueDate: '2024-10-12',
      status: 'pending',
      course: 'Organic Chemistry',
      points: 50
    },
    {
      id: '4',
      title: 'Biology Research Project',
      description: 'Research and present findings on genetic inheritance patterns.',
      type: 'project',
      dueDate: '2024-10-15',
      status: 'completed',
      course: 'Cell Biology',
      points: 200
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <AssignmentsContainer>
      <Container>
        <Header>
          <Title>Your Assignments</Title>
          <Subtitle>Track your progress and stay on top of your coursework</Subtitle>
        </Header>

        <AssignmentsGrid>
          {assignments.map(assignment => (
            <AssignmentCard key={assignment.id}>
              <AssignmentHeader>
                <div>
                  <AssignmentTitle>{assignment.title}</AssignmentTitle>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {assignment.course}
                  </p>
                </div>
                <AssignmentType>{assignment.type}</AssignmentType>
              </AssignmentHeader>
              
              <AssignmentDescription>{assignment.description}</AssignmentDescription>
              
              <AssignmentMeta>
                <MetaItem>
                  <Calendar size={16} />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </MetaItem>
                <MetaItem>
                  <FileText size={16} />
                  {assignment.points} points
                </MetaItem>
                <StatusBadge status={assignment.status}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </StatusBadge>
              </AssignmentMeta>
            </AssignmentCard>
          ))}
        </AssignmentsGrid>
      </Container>
    </AssignmentsContainer>
  );
};

export default AssignmentsPage;
