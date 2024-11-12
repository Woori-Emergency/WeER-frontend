import React, { useState } from 'react';
import styled from 'styled-components';
import PatientInfoCard from '../../components/patientStatus/PatientInfoCard';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import CompletedTransferStatus from '../../components/patientStatus/CompletedTransferStatus';
import { useNavigate } from 'react-router-dom';

const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PatientStatusListPage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const navigate = useNavigate();

  const currentPatient = {
    patientId: 1,
    gender: 'MALE',
    ageGroup: 'THIRTIES',
    bloodPressure: 125,
    heartRate: 75,
    temperature: 36.8,
    respiration: 16,
    medical: 'DISEASE',
    consciousnessLevel: 'ALERT',
    transportStatus: 'IN_PROGRESS',
    created_at: "2024-11-08T10:22:30"
  };

  const completedTransfers = [
    {
      patientId: 2,
      gender: 'FEMALE',
      ageGroup: 'FORTIES',
      bloodPressure: 118,
      heartRate: 72,
      temperature: 36.5,
      respiration: 15,
      medical: 'DISEASE',
      consciousnessLevel: 'ALERT',
      transportStatus: 'COMPLETED',
      created_at: "2024-11-08T09:15:00",
      modified_at: "2024-11-08T09:45:00",
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
      created_at: "2024-11-08T08:30:00",
      modified_at: "2024-11-08T09:00:00",
      hospitalName: "세브란스병원",
      distance: "3.8km",
      duration: "25분"
    }
  ];

  const handleDistanceSort = () => {
    console.log('거리순 정렬');
    navigate('/hospital-list');

  };

  const handleEmergencyFilter = () => {
    console.log('응급실 필터링');
    navigate('/hospital/filter')
  };

  return (
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
  );
};

export default PatientStatusListPage;