import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  flex: 1;
  min-width: 150px;
  padding: 1rem;
  border: none;
  background-color: white;
  color: #374151;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    background-color: #f1f5f9;
  }
`;

const FilterButtons = ({ onDistanceSort, onEmergencyFilter }) => {
  return (
    <FilterContainer>
      <FilterButton onClick={onDistanceSort}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14 14 0 0 0 0 20 14 14 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        </svg>
        거리순 보기
      </FilterButton>
      
      <FilterButton onClick={onEmergencyFilter}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M8 2h8"/>
          <path d="M12 2v8"/>
          <circle cx="12" cy="14" r="8"/>
        </svg>
        응급실 필터링 검색
      </FilterButton>
    </FilterContainer>
  );
};

export default FilterButtons;
