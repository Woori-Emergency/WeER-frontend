import React, { useState } from 'react';
import styled from 'styled-components';
import PatientVitals from '../../components/reservation/PatientVitals';
import ReservationCard from '../../components/reservation/ReservationCard';
import CompletedTransferList from '../../components/reservation/CompletedTransferList';
import { formatDate } from '../../utils/dateUtils';


const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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

const TransportStatus = styled.div`
  background: #ffc107;
  color: #856404;
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

const CompletedTransferSection = styled.div`
  margin-top: 1.5rem;
`;

const AccordionHeader = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
  }
`;

const AccordionTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AccordionIcon = styled.span`
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const CompletedTransferListContainer = styled.div`
  margin-top: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ReservationListPage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const currentPatient = {
    userId: 1,
    gender: 'MALE',
    ageGroup: 'THIRTIES',
    bloodPressure: 125,
    heartRate: 75,
    temperature: 36.8,
    respiration: 16,
    medical: 'DISEASE',
    consciousnessLevel: 'ALERT',
    transportStatus: 'IN_PROGRESS',
    startTime: "2024-11-08T10:22:30"
  };

  const reservations = [
    {
      id: 1,
      hospitalName: "A 종합병원",
      status: "APPROVED",
      createdAt: "2024-11-08T10:30:00",
      distance: "2.5km",
      estimatedTime: "10분"
    },
    {
      id: 2,
      hospitalName: "B 대학병원",
      status: "PENDING",
      createdAt: "2024-11-08T10:32:00",
      distance: "3.8km",
      estimatedTime: "15분"
    },
    {
      id: 3,
      hospitalName: "C 병원",
      status: "REJECTED",
      createdAt: "2024-11-08T10:28:00",
      distance: "5.2km",
      estimatedTime: "20분"
    }
  ];

  const completedTransfers = [
    {
      userId: 2,
      gender: 'FEMALE',
      ageGroup: 'FORTIES',
      bloodPressure: 118,
      heartRate: 72,
      temperature: 36.5,
      respiration: 15,
      medical: 'DISEASE',
      consciousnessLevel: 'ALERT',
      transportStatus: 'COMPLETED',
      startTime: "2024-11-08T09:15:00",
      endTime: "2024-11-08T09:45:00",
      hospitalName: "서울대학교병원",
      distance: "5.2km",
      duration: "30분",
      reservationHistory: [
        {
          id: 1,
          hospitalName: "서울대학교병원",
          status: "APPROVED",
          createdAt: "2024-11-08T09:15:00",
          distance: "5.2km",
          estimatedTime: "30분"
        },
        {
          id: 2,
          hospitalName: "세브란스병원",
          status: "REJECTED",
          createdAt: "2024-11-08T09:10:00",
          distance: "6.1km",
          estimatedTime: "35분"
        }
      ]
    },
    {
      userId: 3,
      gender: 'MALE',
      ageGroup: 'FIFTIES',
      bloodPressure: 135,
      heartRate: 80,
      temperature: 37.1,
      respiration: 18,
      medical: 'TRAUMA',
      consciousnessLevel: 'ALERT',
      transportStatus: 'COMPLETED',
      startTime: "2024-11-08T08:30:00",
      endTime: "2024-11-08T09:00:00",
      hospitalName: "세브란스병원",
      distance: "3.8km",
      duration: "25분",
      reservationHistory: [
        {
          id: 1,
          hospitalName: "세브란스병원",
          status: "APPROVED",
          createdAt: "2024-11-08T08:30:00",
          distance: "3.8km",
          estimatedTime: "25분"
        },
        {
          id: 2,
          hospitalName: "강남성모병원",
          status: "PENDING",
          createdAt: "2024-11-08T08:25:00",
          distance: "4.5km",
          estimatedTime: "30분"
        }
      ]
    }
  ];

  return (
    <Container>
      <ContentWrapper>
        <Card>
          <CardHeader>
            <HeaderTitle>
              <Title>환자 정보</Title>
              <span>이송 시작: {formatDate(currentPatient.startTime)}</span>
            </HeaderTitle>
            <TransportStatus>이송중</TransportStatus>
          </CardHeader>

          <PatientVitals patient={currentPatient} />

          <SectionDivider />
          <SectionTitle>병원 예약 현황</SectionTitle>

        <ReservationGrid>
          {reservations.map(reservation => (
            <ReservationCard 
              key={reservation.id} 
              reservation={reservation} 
            />
          ))}
        </ReservationGrid>
        </Card>

        <CompletedTransferSection>
          <AccordionHeader onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
            <AccordionTitle>
              이송 완료 내역
              <span style={{ color: '#666', fontSize: '1rem', marginLeft: '0.5rem' }}>
                ({completedTransfers.length}건)
              </span>
            </AccordionTitle>
            <AccordionIcon isOpen={isAccordionOpen}>
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
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </AccordionIcon>
          </AccordionHeader>

          {isAccordionOpen && (
            <CompletedTransferListContainer>
              <CompletedTransferList transfers={completedTransfers} />
            </CompletedTransferListContainer>
          )}
        </CompletedTransferSection>
      </ContentWrapper>
    </Container>
  );
};

export default ReservationListPage;