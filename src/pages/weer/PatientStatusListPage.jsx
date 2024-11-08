import React, { useState } from 'react';
import styled from 'styled-components';
import PatientInfoCard from '../../components/patientStatus/PatientInfoCard';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import CompletedTransferStatus from '../../components/patientStatus/CompletedTransferStatus';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PatientStatusListPage = () => {
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
      duration: "30분"
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
      duration: "25분"
    }
  ];

  const handleDistanceSort = () => {
    console.log('거리순 정렬');
  };

  const handleEmergencyFilter = () => {
    console.log('응급실 필터링');
  };

  return (
    <Container>
      <ContentWrapper>
        <PatientInfoCard patient={currentPatient} />
        
        <FilterButtons 
          onDistanceSort={handleDistanceSort} 
          onEmergencyFilter={handleEmergencyFilter} 
        />

        <CompletedTransferStatus 
          isOpen={isAccordionOpen}
          onToggle={() => setIsAccordionOpen(!isAccordionOpen)}
          transfers={completedTransfers}
        />
      </ContentWrapper>
    </Container>
  );
};

export default PatientStatusListPage;