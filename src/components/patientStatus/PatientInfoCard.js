import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateUtils';
import { getAuthHeaders } from '../api/config';


const Card = styled.div`
  background: white;
  overflow: hidden;
  border-bottom: 1px solid transparent;
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
  flex-direction: column;
  gap: 0.5rem;
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
  background: ${props => props.isCompleted ? '#4ade80' : '#ffc107'};
  color: ${props => props.isCompleted ? '#166534' : '#856404'};
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.1rem;
  margin-left: 1rem;
`;

const CompleteButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  
  &:hover {
    background: #2563eb;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 400px;
  max-width: 90%;
`;

const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  
  ${props => props.primary ? `
    background: #3b82f6;
    color: white;
    &:hover {
      background: #2563eb;
    }
  ` : `
    background: #e5e7eb;
    color: #374151;
    &:hover {
      background: #d1d5db;
    }
  `}
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

const getAgeGroupText = (ageGroup) => {
  const ageGroupMap = {
    'UNKNOWN': '알 수 없음',
    'INFANT_TODDLER': '영유아',
    'TEEN': '10대',
    'TWENTIES': '20대',
    'THIRTIES': '30대',
    'FORTIES': '40대',
    'FIFTIES': '50대',
    'SIXTIES': '60대',
    'SEVENTIES_PLUS': '70대 이상'
  };

  return ageGroupMap[ageGroup] || ageGroup;
};

const PatientInfoCard = ({ patient, onComplete }) => {
  // patient의 상태를 초기값으로 사용
  const [isCompleted, setIsCompleted] = useState(patient.status === 'COMPLETED');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/hospital/patient/${patient.patientconditionid}/complete`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
  
      if (!response.ok) {
        throw new Error('이송 완료 처리 중 오류가 발생했습니다.');
      }
  
      setIsCompleted(true);
      setShowModal(false);
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error details:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitleSection>
          <CardTitle>현재 이송중인 환자</CardTitle>
          <TransportInfo>이송 시작: {formatDate(patient.startTime)}</TransportInfo>
        </CardTitleSection>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TransportStatus isCompleted={isCompleted}>
            {isCompleted ? '이송 완료' : '이송중'}
          </TransportStatus>
          {!isCompleted && (
            <CompleteButton onClick={() => setShowModal(true)}>
              이송 완료
            </CompleteButton>
          )}
        </div>
      </CardHeader>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>이송 완료 확인</ModalTitle>
            <p>정말 이송을 완료하시겠습니까?</p>
            <ModalButtons>
              <ModalButton onClick={() => setShowModal(false)}>
                취소
              </ModalButton>
              <ModalButton primary onClick={handleComplete}>
                확인
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}

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
              {getAgeGroupText(patient.ageGroup)}
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