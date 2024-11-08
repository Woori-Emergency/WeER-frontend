import React from 'react';
import styled from 'styled-components';

const VitalSignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: white;
`;

const VitalSign = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: ${props => props.color || '#f3f4f6'};
  border-radius: 0.5rem;
`;

const VitalLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const VitalValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

const PatientVitals = ({ patient }) => {
  return (
    <VitalSignsGrid>
      <VitalSign>
        <VitalLabel>성별/연령</VitalLabel>
        <VitalValue>
          {patient.gender === 'MALE' ? '남성' : '여성'} / {
            patient.ageGroup === 'THIRTIES' ? '30대' : 
            patient.ageGroup === 'FORTIES' ? '40대' : 
            patient.ageGroup === 'FIFTIES' ? '50대' : 
            patient.ageGroup
          }
        </VitalValue>
      </VitalSign>
      <VitalSign color="#fee2e2">
        <VitalLabel>혈압</VitalLabel>
        <VitalValue>{patient.bloodPressure} mmHg</VitalValue>
      </VitalSign>
      <VitalSign color="#dbeafe">
        <VitalLabel>맥박</VitalLabel>
        <VitalValue>{patient.heartRate} bpm</VitalValue>
      </VitalSign>
      <VitalSign>
        <VitalLabel>의식상태</VitalLabel>
        <VitalValue>{patient.consciousnessLevel}</VitalValue>
      </VitalSign>
    </VitalSignsGrid>
  );
};

export default PatientVitals;