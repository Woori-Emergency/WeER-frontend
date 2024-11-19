import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../../components/NoTransfer/NoTrasnfer.styles';
import { getCurrentPatient } from '../../components/api/currentPatient';
import { getCurrentPatientReservation } from '../../components/api/currentReservation';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import PatientInfoCard from '../../components/patientStatus/PatientInfoCard';
import ReservationCard from '../../components/reservation/ReservationCard';
import {
  CenteredContent,
  ContentWrapper
} from '../../styles/CommonStyles';

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 15px;
`;

const SectionDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 0 1.5rem;
`;

const AccordionSection = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
`;

const AccordionHeader = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  background: white;

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
`;

const ReservationCount = styled.span`
  background-color: #e2e8f0;
  color: #64748b;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-weight: 500;
  min-width: 1.5rem;
  text-align: center;
  margin-left: 0.75rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ChevronIcon = styled.svg`
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(-180deg)' : 'rotate(0)'};
  fill: #64748b;
  margin-left: 1.5rem;
  flex-shrink: 0;
  
  &:hover {
    fill: #475569;
  }
`;

const AccordionContent = styled.div`
  background: white;
  transition: max-height 0.3s ease-in-out;
  max-height: ${props => props.isOpen ? '2000px' : '0'};
  overflow: hidden;
`;

const ReservationGrid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
`;

const ReservationListPage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const patient = await getCurrentPatient();
        setCurrentPatient({
          patientconditionid: patient.patientconditionid,
          startTime: patient.createdAt,
          bloodPressure: patient.bloodPressure,
          heartRate: patient.heartRate,
          temperature: patient.temperature,
          respiration: patient.respiration,
          consciousnessLevel: patient.consciousnessLevel,
          ageGroup: patient.ageGroup,
          gender: patient.gender
        });
        
        const reservationData = await getCurrentPatientReservation();
        setReservations(Array.isArray(reservationData) ? reservationData : []);
        
      } catch (error) {
        console.error("환자 정보 조회 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatient();
  }, []); 

  const handleDistanceSort = () => {
    navigate('/hospital-list');
  };

  const handleEmergencyFilter = () => {
    navigate('/hospital/filter');
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  if (loading) {
    return <ContentWrapper>로딩 중...</ContentWrapper>;
  }

  if (error) {
    return <ContentWrapper>
      <CenteredContent>
      <S.AlertIcon>⚠️</S.AlertIcon>
          <S.AlertText>현재 진행중인 이송이 없습니다</S.AlertText>
      </CenteredContent>
      </ContentWrapper>
  }

  if (!currentPatient) {
    return <ContentWrapper>
    <CenteredContent>
    <S.AlertIcon>⚠️</S.AlertIcon>
        <S.AlertText>현재 진행중인 이송이 없습니다</S.AlertText>
    </CenteredContent>
    </ContentWrapper>
  }

  const activeReservationsCount = reservations.length;

  return (
    <ContentWrapper>
      <Card>
        <PatientInfoCard patient={currentPatient} isCompleted={currentPatient.transportStatus === 'COMPLETED'}  />
        <SectionDivider />
        
        <AccordionSection>
          <AccordionHeader onClick={toggleAccordion}>
            <TitleContainer>
              <AccordionTitle>
                병원 예약 현황
                <ReservationCount>{activeReservationsCount}</ReservationCount>
              </AccordionTitle>
            </TitleContainer>
            <ChevronIcon 
              isOpen={isAccordionOpen}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </ChevronIcon>
          </AccordionHeader>
          
          <AccordionContent isOpen={isAccordionOpen}>
            <ReservationGrid>
              {reservations.map(reservation => (
                <ReservationCard 
                  key={reservation.id} 
                  reservation={reservation} 
                />
              ))}
            </ReservationGrid>
          </AccordionContent>
        </AccordionSection>
      </Card>
      
      <FilterButtons
        onDistanceSort={handleDistanceSort}
        onEmergencyFilter={handleEmergencyFilter}
      />
    </ContentWrapper>
  );
};

export default ReservationListPage;