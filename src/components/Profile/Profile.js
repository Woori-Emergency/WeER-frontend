// src/components/Profile/Profile.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PoweroffOutlined } from '@ant-design/icons';
import * as S from './Profile.styles';

const Profile = ({ payload }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setLoading(true); // 로딩 시작

    // 모든 토큰 및 사용자 정보를 로컬 스토리지에서 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    // 세션 스토리지에서도 모든 로그인 관련 정보를 삭제
    sessionStorage.clear();

    // 1초 뒤에 리다이렉션과 로딩 종료
    setTimeout(() => {
      setLoading(false); // 로딩 종료
      window.location.replace(location.pathname); // 현재 페이지 새로고침하여 상태 초기화
    }, 1000);
  };

  return (
    <S.ProfileContainer>
      <S.ProfileImage>
        <img src="/images/default.jpg" alt="프로필" />
      </S.ProfileImage>
      <S.ProfileInfo>
        <S.UserRow>
          <S.UserName>{payload.sub}</S.UserName>
          <S.LogoutIconButton
            icon={<PoweroffOutlined />}
            loading={loading} // 로딩 상태 적용
            onClick={handleLogout}
          />
        </S.UserRow>
        <div>
          <S.VerifiedBadge>Verified</S.VerifiedBadge>
          <S.ProfileTypeButton>프로필 설정</S.ProfileTypeButton>
        </div>
      </S.ProfileInfo>
    </S.ProfileContainer>
  );
};

export default Profile;