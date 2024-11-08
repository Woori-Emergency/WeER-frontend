import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateUtils';

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  align-items: center;
`;

const CardTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const TransportInfo = styled.span`
  font-size: 1rem;
  color: #666;
  margin-left: auto;
`;

const TransportStatus = styled.div`
  background: #ffc107;
  color: #856404;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.1rem;
  margin-left: 1rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.color || '#f3f4f6'};
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
`;

const PatientInfoCard = ({ patient, isCompleted = false }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitleSection>
          <CardTitle>환자 상태 정보</CardTitle>
          <TransportInfo>이송 시작: {formatDate(patient.startTime)}</TransportInfo>
        </CardTitleSection>
        <TransportStatus>{isCompleted ? '이송 완료' : '이송중'}</TransportStatus>
      </CardHeader>
      
      <CardContent>
        <InfoGrid>
          <InfoCard>
            <InfoLabel>성별</InfoLabel>
            <InfoValue>
              {patient.gender === 'MALE' ? '남성' : 
               patient.gender === 'FEMALE' ? '여성' : '미상'}
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>연령대</InfoLabel>
            <InfoValue>
              {patient.ageGroup === 'THIRTIES' ? '30대' : 
               patient.ageGroup === 'FORTIES' ? '40대' : 
               patient.ageGroup === 'FIFTIES' ? '50대' : 
               patient.ageGroup}
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>진료 구분</InfoLabel>
            <InfoValue>
              {patient.medical === 'DISEASE' ? '질병' : '질병 외'}
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>의식 수준</InfoLabel>
            <InfoValue>{patient.consciousnessLevel}</InfoValue>
          </InfoCard>

          <InfoCard color="#fee2e2">
            <InfoLabel>혈압</InfoLabel>
            <InfoValue>{patient.bloodPressure} mmHg</InfoValue>
          </InfoCard>

          <InfoCard color="#ffedd5">
            <InfoLabel>맥박</InfoLabel>
            <InfoValue>{patient.heartRate} bpm</InfoValue>
          </InfoCard>

          <InfoCard color="#fef3c7">
            <InfoLabel>체온</InfoLabel>
            <InfoValue>{patient.temperature}°C</InfoValue>
          </InfoCard>

          <InfoCard color="#dbeafe">
            <InfoLabel>호흡수</InfoLabel>
            <InfoValue>{patient.respiration} /min</InfoValue>
          </InfoCard>
        </InfoGrid>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
