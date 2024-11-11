import React from 'react';
import * as S from './ActionButtons.styles';

const ActionButtons = ({ onDistanceSort, onFilterSearch }) => {
  return (
    <S.ButtonContainer>
      <S.ActionButton onClick={onDistanceSort}>
        거리순 보기
        <span>→</span>
      </S.ActionButton>
      <S.ActionButton onClick={onFilterSearch}>
        응급실 필터링검색
        <span>→</span>
      </S.ActionButton>
    </S.ButtonContainer>
  );
};

export default ActionButtons;