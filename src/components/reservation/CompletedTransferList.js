import React from 'react';
import styled from 'styled-components';
import PatientVitals from './PatientVitals';
import ReservationCard from './ReservationCard';
import { formatDate } from '../../utils/dateUtils';

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const TransferTime = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const TransportStatus = styled.div`
  background: #22c55e;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.1rem;
`;

const SectionDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 0 1.5rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
`;

const ReservationGrid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
`;

const CompletedTransferList = ({ transfers }) => {
  return (
    <div>
      {transfers.map((transfer, index) => (
        <Card key={index}>
          <CardHeader>
            <HeaderTitle>
              <Title>{transfer.hospitalName}</Title>
              <TransferTime>
                이송 시작: {formatDate(transfer.startTime)}
                <br />
                이송 완료: {formatDate(transfer.endTime)}
                <br />
                이송 거리: {transfer.distance} (소요시간: {transfer.duration})
              </TransferTime>
            </HeaderTitle>
            <TransportStatus>이송 완료</TransportStatus>
          </CardHeader>

          <PatientVitals patient={transfer} />

          <SectionDivider />
          <SectionTitle>병원 예약 내역</SectionTitle>
          
          <ReservationGrid>
            {transfer.reservationHistory.map(reservation => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </ReservationGrid>
        </Card>
      ))}
    </div>
  );
};

export default CompletedTransferList;