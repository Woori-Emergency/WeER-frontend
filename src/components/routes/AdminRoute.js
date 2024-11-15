import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const token = localStorage.getItem('accessToken'); // 'token' 대신 'accessToken' 사용
  const userRole = localStorage.getItem('role');
  const tokenExpiry = parseInt(localStorage.getItem('tokenExpiry'), 10);
  const currentTime = Date.now();

  useEffect(() => {
    // 토큰과 역할 확인 및 만료 시간 검사
    if (token && userRole === 'ADMIN' && (!tokenExpiry || currentTime < tokenExpiry)) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [token, userRole, tokenExpiry, currentTime]);

  // 로딩 중
  if (isAuthorized === null) return <div>로딩 중...</div>;

  // 권한이 없거나 토큰이 만료된 경우 로그인 페이지로 리디렉션
  if (!isAuthorized) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // 하위 컴포넌트를 렌더링
};

export default AdminRoute;