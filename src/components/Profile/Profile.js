import React from 'react';
import * as S from './Profile.styles';

const Profile = ({payload}) => {
  return (
    <S.ProfileContainer>
      <S.ProfileImage>
        <img src="/images/default.jpg" alt="프로필" />
      </S.ProfileImage>
      <S.ProfileInfo>
        <S.UserName>{payload.sub}</S.UserName>
        <div>
          <S.VerifiedBadge>Verified</S.VerifiedBadge>
          <S.ProfileTypeButton>프로필 설정</S.ProfileTypeButton>
        </div>
      </S.ProfileInfo>
    </S.ProfileContainer>
  );
};

export default Profile;