// src/components/common/AdminHeader.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Profile from '../Profile/Profile';
import { jwtDecode } from 'jwt-decode'; 

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
  color: ${(props) => (props.active ? '#E97132' : '#333')};

  &:hover {
    color: #E97132;
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

function AdminHeader() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPayload, setUserPayload] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIsLoggedIn(true);
          setUserPayload(decoded);
        } catch (error) {
          console.error("토큰 디코딩 실패:", error);
          handleLogout();
        }
      } else {
        setIsLoggedIn(false);
        setUserPayload(null);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserPayload(null);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/">
          <LogoImage src="/weer_logo.png" alt="Logo" />
        </Link>
      </LogoContainer>
      
      <Nav>
        {/* 관리자용 네비게이션 링크 */}
        <NavItem to="/admin/users" active={location.pathname === "/admin/users"}>
          사용자 조회
        </NavItem>
        <NavItem to="/admin/approvals" active={location.pathname === "/admin/approvals"}>
          가입 승인/반려
        </NavItem>
        <NavItem to="/admin/dashboard" active={location.pathname === "/admin/dashboard"}>
          대시보드
        </NavItem>
        {isLoggedIn ? (
          <Profile payload={userPayload} onLogout={handleLogout} />
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

export default AdminHeader;