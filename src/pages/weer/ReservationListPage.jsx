import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCurrentPatient } from '../../components/api/currentPatient';
import { getCurrentPatientReservation } from '../../components/api/currentReservation';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import PatientInfoCard from '../../components/patientStatus/PatientInfoCard';
import ReservationCard from '../../components/reservation/ReservationCard';
import {
  ContentWrapper,
} from '../../styles/CommonStyles';
import { formatDate } from '../../utils/dateUtils';

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom : 15px;
  
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
  const navigate = useNavigate();

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
          temperature: patient.temperature,
          respiration: patient.respiration,
          consciousnessLevel: patient.consciousnessLevel,
          ageGroup: patient.ageGroup,
          gender: patient.gender
        });
        console.log(formatDate(patient.createdAt));
        
        const reservationData = await getCurrentPatientReservation();
        setReservations(Array.isArray(reservationData) ? reservationData : []);
        console.log("Res:", reservationData);
        
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
        <PatientInfoCard patient={currentPatient} />

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
      <FilterButtons
        onDistanceSort={handleDistanceSort}
        onEmergencyFilter={handleEmergencyFilter}
      />
    </ContentWrapper>
  );
};

export default ReservationListPage;