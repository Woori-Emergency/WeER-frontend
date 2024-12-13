import styled from 'styled-components';
import { Button } from 'antd';

export const Card = styled.div`
  background: white;
  overflow: hidden;
  border-bottom: 1px solid transparent;
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  align-items: center;
`;

export const CardTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StatusTag = styled.div`
  background: ${props => props.isCompleted ? '#dcfce7' : '#fef9c3'};
  color: ${props => props.isCompleted ? '#166534' : '#854d0e'};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

export const TransportInfo = styled.span`
  font-size: 1rem;
  color: #666;
  margin-left: auto;
`;

export const CompleteButton = styled(Button)`
  background: white;
  color: ${({ isLoading }) => (isLoading ? '#aaa' : '#E97132')};
  padding: 0.5rem 1rem;
  border: 1px solid ${({ isLoading }) => (isLoading ? '#ddd' : '#E97132')};
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ isLoading }) => (isLoading ? 'white' : '#FFF4ED')};
  }

  &:active {
    background: ${({ isLoading }) => (isLoading ? 'white' : '#FFE9DC')};
  }
`;
export const CheckIcon = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: 24px;
  height: 24px;
  margin: auto;
  background-color: #4caf50; /* Green background for success */
  border-radius: 50%;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;

  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 5px;
    border: solid white;
    border-width: 0 2px 2px 0;
    top: 6px;
    left: 7px;
    transform: rotate(45deg);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 400px;
  max-width: 90%;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  
  ${props => props.primary ? `
    background: #3b82f6;
    color: white;
    &:hover {
      background: #2563eb;
    }
  ` : `
    background: #e5e7eb;
    color: #374151;
    &:hover {
      background: #d1d5db;
    }
  `}
`;
export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const InfoCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.color || '#f3f4f6'};
  display: flex;
  flex-direction: column;
`;

export const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

export const InfoValue = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
`;

