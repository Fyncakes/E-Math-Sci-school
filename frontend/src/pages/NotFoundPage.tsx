import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing.md};
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 500px;
`;

const NotFoundTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['6xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const NotFoundSubtitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const NotFoundDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-decoration: none;
  transition: all 0.2s ease;
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Button)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
        <NotFoundDescription>
          Sorry, the page you are looking for doesn't exist or has been moved.
          Let's get you back on track!
        </NotFoundDescription>
        <ButtonGroup>
          <PrimaryButton to="/">
            <Home size={20} />
            Go Home
          </PrimaryButton>
          <SecondaryButton to="javascript:history.back()">
            <ArrowLeft size={20} />
            Go Back
          </SecondaryButton>
        </ButtonGroup>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
