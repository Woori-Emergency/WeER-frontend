import React from 'react';
import * as S from './Search.styles';

const Search = ({ onSearch }) => {
  return (
    <S.SearchContainer>
      <S.SearchWrapper>
        <S.SearchInput placeholder="Search..." />
        <S.SearchButton onClick={onSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </S.SearchButton>
      </S.SearchWrapper>
    </S.SearchContainer>
  );
};

export default Search;