import React from 'react';
import styled from 'styled-components';
import { User, Mail, Calendar, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing['2xl']} 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['3xl']};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Name = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Role = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const InfoIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const InfoContent = styled.div`
  text-align: left;
`;

const InfoLabel = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const InfoValue = styled.p`
  color: ${props => props.theme.colors.gray[900]};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <Container>
        <ProfileCard>
          <Avatar>
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </Avatar>
          <Name>{user.firstName} {user.lastName}</Name>
          <Role>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Role>
          
          <InfoGrid>
            <InfoItem>
              <InfoIcon>
                <Mail size={20} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{user.email}</InfoValue>
              </InfoContent>
            </InfoItem>
            
            {user.grade && (
              <InfoItem>
                <InfoIcon>
                  <Calendar size={20} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Grade Level</InfoLabel>
                  <InfoValue>Grade {user.grade}</InfoValue>
                </InfoContent>
              </InfoItem>
            )}
            
            <InfoItem>
              <InfoIcon>
                <BookOpen size={20} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Enrolled Courses</InfoLabel>
                <InfoValue>{user.enrolledCourses?.length || 0}</InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <Award size={20} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Achievements</InfoLabel>
                <InfoValue>{user.achievements?.length || 0}</InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoGrid>
        </ProfileCard>
      </Container>
    </ProfileContainer>
  );
};

export default ProfilePage;
