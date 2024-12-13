import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const PendingBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  font-size: 14px;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 24px;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequestTime = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 14px;
  background-color: ${props => {
    switch(props.reservationStatus) {
      case 'PENDING': return '#FCD34D';
      case 'APPROVED': return '#10B981';
      case 'DECLINED': return '#EF4444';
      default: return '#E5E7EB';
    }
  }};
  color: ${props => props.reservationStatus === 'PENDING' ? '#000' : '#FFF'};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InfoCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.bgColor || '#F3F4F6'};
`;

const InfoLabel = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  ${props => props.variant === 'outline'
    ? `
      border: 1px solid #E5E7EB;
      background: transparent;
      color: #E97132;
      
      &:hover {
        background: rgba(233, 113, 50, 0.1);
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(233, 113, 50, 0.2);
      }
    `
    : `
      background: #E97132;
      color: white;
      border: none;
      
      &:hover {
        background: #d65f21;
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(233, 113, 50, 0.2);
      }
    `
  }
`;

export {
  Container,
  Header,
  Title,
  PendingBadge,
  CardGrid,
  Card,
  CardHeader,
  CardTitle,
  RequestTime,
  StatusBadge,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  ButtonContainer,
  Button
};