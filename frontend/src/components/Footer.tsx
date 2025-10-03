import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.gray[900]};
  color: ${props => props.theme.colors.white};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.md};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.white};
    margin-bottom: ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.lg};
  }

  p {
    color: ${props => props.theme.colors.gray[300]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.gray[300]};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray[300]};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.gray[800]};
  color: ${props => props.theme.colors.gray[300]};
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray[800]};
  padding-top: ${props => props.theme.spacing.lg};
  text-align: center;
  color: ${props => props.theme.colors.gray[400]};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <Logo to="/">
              <BookOpen size={24} />
              E-Math-Sci
            </Logo>
            <p>
              Enhancing math and science lovers to high heights. 
              Join our community of learners and educators dedicated to 
              excellence in mathematics and science education.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/courses">Courses</FooterLink>
              <FooterLink to="/assignments">Assignments</FooterLink>
              <FooterLink to="/quiz">Practice Quiz</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Subjects</h3>
            <FooterLinks>
              <FooterLink to="/courses?subject=mathematics">Mathematics</FooterLink>
              <FooterLink to="/courses?subject=physics">Physics</FooterLink>
              <FooterLink to="/courses?subject=chemistry">Chemistry</FooterLink>
              <FooterLink to="/courses?subject=biology">Biology</FooterLink>
              <FooterLink to="/courses?subject=computer-science">Computer Science</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <Mail size={16} />
              <span>info@emathsci.edu</span>
            </ContactInfo>
            <ContactInfo>
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </ContactInfo>
            <ContactInfo>
              <MapPin size={16} />
              <span>123 Education Street, Learning City, LC 12345</span>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 E-Math-Sci School. All rights reserved.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
