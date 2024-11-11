import styled from 'styled-components';

export const StatusIndicators = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
  }
`;

export const StatusButton = styled.button`
  padding: 6px 12px;
  min-width: 75px;
  border-radius: 15px;
  border: none;
  color: white;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  white-space: nowrap;
  background-color: ${props => {
    switch (props.status) {
      case 'available': return '#7BC9A3';
      case 'checking': return '#FF9B50';
      case 'unavailable': return '#FF5A5A';
      default: return '#666';
    }
  }};

  @media (max-width: 480px) {
    padding: 5px 10px;
    min-width: 65px;
    font-size: 12px;
  }
`;