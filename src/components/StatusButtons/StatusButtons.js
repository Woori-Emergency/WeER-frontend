import React from 'react';
import * as S from './StatusButtons.styles';

const StatusButtons = ({ onStatusChange }) => {
  return (
    <S.StatusIndicators>
      <S.StatusButton 
        status="available"
        onClick={() => onStatusChange('available')}
      >
        이용 가능
      </S.StatusButton>
      <S.StatusButton 
        status="checking"
        minWidth="85px"
        onClick={() => onStatusChange('checking')}
      >
        확인필요
      </S.StatusButton>
      <S.StatusButton 
        status="unavailable"
        onClick={() => onStatusChange('unavailable')}
      >
        불가능
      </S.StatusButton>
    </S.StatusIndicators>
  );
};

export default StatusButtons;