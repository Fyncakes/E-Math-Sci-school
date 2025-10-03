import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  padding: ${props => props.theme.spacing.md};
`;

const RegisterCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  box-shadow: ${props => props.theme.shadows.xl};
  padding: ${props => props.theme.spacing['3xl']};
  width: 100%;
  max-width: 500px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`;

const Title = styled.h1`
  text-align: center;
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray[900]};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[700]};
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing['2xl']};
  border: 2px solid ${props => props.hasError ? props.theme.colors.error : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing['2xl']};
  border: 2px solid ${props => props.hasError ? props.theme.colors.error : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray[400]};
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[400]};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Button = styled.button<{ isLoading?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.isLoading ? 0.7 : 1};
  pointer-events: ${props => props.isLoading ? 'none' : 'auto'};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.spacing.lg} 0;
  color: ${props => props.theme.colors.gray[500]};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.gray[300]};
  }

  span {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const LinkText = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};

  &:hover {
    text-decoration: underline;
  }
`;

const TextCenter = styled.div`
  text-align: center;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin: ${props => props.theme.spacing.md} 0;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${props => props.theme.colors.primary};
`;

const CheckboxLabel = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  cursor: pointer;
`;

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'teacher';
  grade?: string;
  subjects?: string[];
  agreeToTerms: boolean;
}

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, agreeToTerms, ...userData } = data;
      await registerUser(userData);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const subjects = [
    'mathematics',
    'physics',
    'chemistry',
    'biology',
    'computer-science'
  ];

  const grades = ['6', '7', '8', '9', '10', '11', '12', 'college'];

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo>
          <BookOpen size={32} />
          E-Math-Sci
        </Logo>
        <Title>Create Account</Title>
        <Subtitle>Join our community of learners and educators</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <InputContainer>
                <InputIcon>
                  <User size={20} />
                </InputIcon>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  hasError={!!errors.firstName}
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters',
                    },
                  })}
                />
              </InputContainer>
              {errors.firstName && (
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <InputContainer>
                <InputIcon>
                  <User size={20} />
                </InputIcon>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  hasError={!!errors.lastName}
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters',
                    },
                  })}
                />
              </InputContainer>
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputContainer>
              <InputIcon>
                <Mail size={20} />
              </InputIcon>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                hasError={!!errors.email}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </InputContainer>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="role">I am a</Label>
            <InputContainer>
              <InputIcon>
                <GraduationCap size={20} />
              </InputIcon>
              <Select
                id="role"
                hasError={!!errors.role}
                {...register('role', {
                  required: 'Please select your role',
                })}
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Select>
            </InputContainer>
            {errors.role && (
              <ErrorMessage>{errors.role.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="grade">Grade Level (for students)</Label>
            <InputContainer>
              <InputIcon>
                <GraduationCap size={20} />
              </InputIcon>
              <Select
                id="grade"
                hasError={!!errors.grade}
                {...register('grade')}
              >
                <option value="">Select grade level</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    Grade {grade === 'college' ? 'College' : grade}
                  </option>
                ))}
              </Select>
            </InputContainer>
            {errors.grade && (
              <ErrorMessage>{errors.grade.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <InputContainer>
                <InputIcon>
                  <Lock size={20} />
                </InputIcon>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  hasError={!!errors.password}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </PasswordToggle>
              </InputContainer>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputContainer>
                <InputIcon>
                  <Lock size={20} />
                </InputIcon>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  hasError={!!errors.confirmPassword}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </PasswordToggle>
              </InputContainer>
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormRow>

          <CheckboxContainer>
            <Checkbox
              id="agreeToTerms"
              type="checkbox"
              {...register('agreeToTerms', {
                required: 'You must agree to the terms and conditions',
              })}
            />
            <CheckboxLabel htmlFor="agreeToTerms">
              I agree to the{' '}
              <LinkText to="/terms" target="_blank">
                Terms and Conditions
              </LinkText>{' '}
              and{' '}
              <LinkText to="/privacy" target="_blank">
                Privacy Policy
              </LinkText>
            </CheckboxLabel>
          </CheckboxContainer>
          {errors.agreeToTerms && (
            <ErrorMessage>{errors.agreeToTerms.message}</ErrorMessage>
          )}

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <TextCenter>
          <span>Already have an account? </span>
          <LinkText to="/login">Sign in here</LinkText>
        </TextCenter>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage;
