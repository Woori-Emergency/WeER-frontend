import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Profile from '../Profile/Profile';
import { getRole, getToken } from '../api/config';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;
  height: 50px;
  margin-right: 5px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  font-size: 16px;
  color: #333;
  text-decoration: none;
  margin: 0 15px;
  position: relative;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#E97132 ' : '#333')};

  &:hover {
    color: #E97132 ;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  background: #f5f7fa;
  padding: 8px 12px;
  border-radius: 20px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const LoginIcon = styled(FaUserCircle)`
  margin-right: 5px;
  font-size: 20px;
  color: #333;
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userPayload, setUserPayload] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async() => {
      const token = await getToken();
      const role = await getRole();
      console.log(role);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIsLoggedIn(true);
          setRole(role);
          setUserPayload(decoded);
          if (role === 'HOSPITAL_ADMIN' && location.pathname === '/') {
            navigate('/hospital-booking-list');
          }
        } catch (error) {
          console.error("토큰 가져오기 실패:", error);
          setIsLoggedIn(false);
          setRole(null);
          setUserPayload(null);
        }
      } else {
        setIsLoggedIn(false);
        setRole(role);
        setUserPayload(null);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location.pathname, navigate]);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/" active={location.pathname === "/" ? 1 : 0}>
          <LogoImage src="/weer_logo.png" alt="Logo" />
        </Link>
      </LogoContainer>
      
      <Nav>
      {isLoggedIn && (
  <>
    {role === 'MEMBER' && (
      <>
        <NavItem 
          to="/my-booking-requests" 
          active={location.pathname === "/my-booking-requests" ? 1 : 0}
        >
          실시간 환자 예약 확인
        </NavItem>
        
        <NavItem 
          to="/patient-status-list" 
          active={location.pathname === "/patient-status-list" ? 1 : 0}
        >
          이송 환자 리스트 
        </NavItem>
        
        <NavItem
          to="/patient-status-input"
          active={location.pathname === "/patient-status-input" ? 1 : 0}
        >
          환자 상태 기입
        </NavItem>
      </>
    )}
    
    {role === 'HOSPITAL_ADMIN' && (
      <NavItem
        to="/hospital-booking-list"
        active={location.pathname === "/hospital-booking-list" ? 1 : 0}
      >
        예약 승인/반려
      </NavItem>
    )}
  </>
)}
        
        {isLoggedIn ? (
          <Profile payload={userPayload} />
        ) : (
          <LoginButton to="/login">
            <LoginIcon />
            로그인
          </LoginButton>
        )}
      </Nav>
    </HeaderContainer>
  );
}

export default Header;