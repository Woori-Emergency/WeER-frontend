import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateUtils';


const Card = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  padding: 1rem;
  background: ${props => {
    switch (props.status) {
      case 'APPROVED': return '#dcfce7';
      case 'REJECTED': return '#fee2e2';
      case 'PENDING': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  border-bottom: 1px solid #e2e8f0;
`;

const HospitalName = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'APPROVED': return '#22c55e';
      case 'REJECTED': return '#ef4444';
      case 'PENDING': return '#f59e0b';
      default: return '#6b7280';
    }
  }};
  color: white;
`;

const Details = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: #666;
`;

const DetailValue = styled.span`
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
`;

const ReservationCard = ({ reservation }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 'APPROVED': return '승인됨';
      case 'REJECTED': return '반려됨';
      case 'PENDING': return '대기중';
      case 'CANCELLED': return '취소됨';
      default: return '알 수 없음';
    }
  };

  return (
    <Card>
      <Header status={reservation.reservationStatus}>
        <HospitalName>
          {reservation.hospitalName}
          <StatusBadge status={reservation.reservationStatus}>
            {getStatusText(reservation.reservationStatus)}
          </StatusBadge>
        </HospitalName>
      </Header>
      <Details>
        <DetailItem>
          <DetailLabel>예약 시각</DetailLabel>
          <DetailValue>{formatDate(reservation.createdAt)}</DetailValue>
        </DetailItem>
      </Details>
    </Card>
  );
};

export default ReservationCard;