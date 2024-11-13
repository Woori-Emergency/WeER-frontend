import React from 'react';
import * as S from './Profile.styles';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {

  fetch('http://localhost:8080/user/info')
  return (
    <S.ProfileContainer>
      <S.ProfileImage>
        <img src="/images/default.jpg" alt="프로필" />
      </S.ProfileImage>
      <S.ProfileInfo>
        <S.UserName>이름</S.UserName>
        <div>
          <S.VerifiedBadge>Verified</S.VerifiedBadge>
          <S.ProfileTypeButton>프로필 설정</S.ProfileTypeButton>
        </div>
      </S.ProfileInfo>
    </S.ProfileContainer>
  );
};

export default Profile;