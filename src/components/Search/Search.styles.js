import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: 450px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;



export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px 45px 15px 20px;  // 패딩 수정
  border: none;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: transparent;

  &::placeholder {
    color: #999;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #4a90e2;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;