import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${props => props.theme.colors.gray[200]};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
