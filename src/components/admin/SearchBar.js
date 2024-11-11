// src/components/admin/SearchBar.js
import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: #E97132;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function SearchBar({ search, onSearchChange, onSearch }) {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <SearchButton onClick={onSearch}>조회</SearchButton>
    </SearchContainer>
  );
}

export default SearchBar;