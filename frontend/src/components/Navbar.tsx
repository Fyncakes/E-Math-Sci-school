import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, User, BookOpen, BarChart3, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled(Link)`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.shadows.lg};
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.3s ease;
    z-index: 999;
  }
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[700]};
  text-decoration: none;
  font-weight: ${props => props.active ? props.theme.fontWeights.semibold : props.theme.fontWeights.normal};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[100]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[200]};
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm};
  min-width: 200px;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.gray[700]};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.error};
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">
          <BookOpen size={24} />
          E-Math-Sci
        </Logo>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" active={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/courses" active={isActive('/courses')}>
            Courses
          </NavLink>
          {user && (
            <>
              <NavLink to="/assignments" active={isActive('/assignments')}>
                Assignments
              </NavLink>
              <NavLink to="/quiz" active={isActive('/quiz')}>
                Quiz
              </NavLink>
            </>
          )}
        </NavLinks>

        <UserMenu>
          {user ? (
            <>
              <UserButton onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <UserAvatar>
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </UserAvatar>
                <span className="hide-mobile">{user.firstName}</span>
              </UserButton>
              <DropdownMenu isOpen={isUserMenuOpen}>
                <DropdownItem to="/dashboard">
                  <BarChart3 size={16} />
                  Dashboard
                </DropdownItem>
                <DropdownItem to="/profile">
                  <Settings size={16} />
                  Profile
                </DropdownItem>
                <LogoutButton onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </LogoutButton>
              </DropdownMenu>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </UserMenu>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
