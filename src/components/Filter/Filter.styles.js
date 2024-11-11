import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
`;

export const LocationSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SelectBox = styled.div`
  padding: 8px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  cursor: pointer;
  background: white;
  min-width: 120px;

  svg {
    color: #4B98F8;
  }
`;

export const RefreshButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const FilterTitle = styled.div`
  padding: 8px 20px;
  background: #4B98F8;
  color: white;
  border-radius: 8px;
  font-weight: 500;
`;

export const SelectAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: white;
  color: #666;
  font-size: 13px;
  cursor: pointer;
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 8px;
  border-bottom: 1px solid #E2E8F0;
  gap: 8px; 
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const SearchButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #4B98F8;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Filter.styles.js에 추가
export const LocationIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #4B98F8;

  &::before {
    content: "📍"; // 임시 아이콘
  }
`;

export const RefreshIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #4B98F8;

  &::before {
    content: "🔄"; // 임시 아이콘
  }
`;