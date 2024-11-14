import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PatientVitals from '../../components/reservation/PatientVitals';
import ReservationCard from '../../components/reservation/ReservationCard';
import CompletedTransferList from '../../components/reservation/CompletedTransferList';
import { 

  ContentWrapper,
} from '../../styles/CommonStyles';
import { getCurrentPatient } from '../../components/api/currentPatient';
import { getCurrentPatientReservation } from '../../components/api/currentReservation';
import { useGeoLocation } from '../../components/GeoLocation/GeoLocation';


const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 1000 * 15,
  maximumAge: 1000 * 60 * 5 * 10
};

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
  const [currentPatient, setCurrentPatient] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {latitude, longitude, error: locationError } = useGeoLocation(GEOLOCATION_OPTIONS);

  const formatDate = (dateString) => {
    if (!dateString) return '';
  
    try {
      const date = new Date(dateString);
      return `이송 시작: ${new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',  
        day: 'numeric', 
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: 'h23', 
      }).format(date)}`;
    } catch (error) {
      if (error instanceof RangeError) {
        console.error('Invalid date format:', dateString);
        return 'N/A';
      } else {
        throw error;
      }
    }
  };
  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const patient = await getCurrentPatient();
        console.log(patient);
        setCurrentPatient({
          patientconditionid: patient.patientconditionid,
          startTime: patient.createdAt,
          bloodPressure: patient.bloodPressure,
          heartRate: patient.heartRate,
          consciousnessLevel: patient.consciousnessLevel,
          ageGroup: patient.ageGroup,
          gender: patient.gender
        });
        console.log(formatDate(patient.createdAt));
        
          const reservationData = await getCurrentPatientReservation();
          setReservations(Array.isArray(reservationData) ? reservationData : []);
          console.log(reservationData);
        
      } catch (error) {
        console.error("환자 정보 조회 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatient();
  }, []); 
  

  const completedTransfers = [
    // 이송 완료 데이터
  ];

  if (loading) {
    return <ContentWrapper>로딩 중...</ContentWrapper>;
  }

  if (error) {
    return <ContentWrapper>에러 발생: {error}</ContentWrapper>;
  }

  if (!currentPatient) {
    return <ContentWrapper>환자 정보가 없습니다.</ContentWrapper>;
  }

  return (
    <ContentWrapper>
      <Card>
        <CardHeader>
          <HeaderTitle>
            <Title>환자 정보</Title>
            <span>{formatDate(currentPatient.startTime)}</span>
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
  );
};

export default ReservationListPage;