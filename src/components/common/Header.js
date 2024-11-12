import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom'; 
import { FaUserCircle } from 'react-icons/fa';
import Profile from '../Profile/Profile';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 130px;
  height: 50px;
  margin-right: 5px;
`;

const LogoText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
`;

const Subtitle = styled.div`
  font-size: 12px;
  color: #666;
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
  /* 로그인 후, 프로필로 바뀌는 것 확인하기 위함*/
  const isLoggedIn = false; 

  return (
    <HeaderContainer>
      <LogoContainer>
        {/* 로고 이미지를 Link로 감싸 메인 페이지로 이동 */}
        <Link to="/">
          <LogoImage src="/weer_logo.png" alt="Logo" />
        </Link>
      </LogoContainer>
      
      <Nav>
        <NavItem to="/" active={location.pathname === "/"}>메인</NavItem>
        <NavItem to="/my-booking-requests" active={location.pathname === "/my-booking-requests"}>
          예약 확인
        </NavItem>
        <NavItem to="/patient-status-list" active={location.pathname === "/patient-status-list"}>
          환자 상태 내역
        </NavItem>
        {isLoggedIn && (
          <NavItem 
            to="/patient-status-input"
            active={location.pathname === "/patient-status-input"}
          >
            환자 상태 기입
          </NavItem>
        )}
        {isLoggedIn ? (
          <Profile />
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