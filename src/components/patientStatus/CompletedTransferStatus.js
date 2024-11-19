import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateUtils';

const CompletedTransfersSection = styled.div`
  margin-top: 1.5rem;
`;

const TransferItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const HospitalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const HospitalName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;

const TransferInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const TransferStatus = styled.div`
  background: #22c55e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
`;

const TransferInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TransferLabel = styled.span`
  font-weight: 500;
  min-width: 45px;  // 라벨들을 일정한 너비로 정렬
`;

const TransferValue = styled.span`
  color: #333;
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
  background-color: ${props => props.color || '#f8f9fa'};
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
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
  margin-bottom: 1rem;

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

const CompletedTransferStatus = ({ isOpen, onToggle, transfers }) => {
  console.log(transfers)
  return (
    <CompletedTransfersSection>
      <AccordionHeader onClick={onToggle}>
        <AccordionTitle>
          이송 완료 내역
          <span style={{ color: '#666', fontSize: '1rem', marginLeft: '0.5rem' }}>
            ({transfers.length}건)
          </span>
        </AccordionTitle>
        <AccordionIcon isOpen={isOpen}>
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

      {isOpen && transfers.map((transfer) => (
        <TransferItem key={transfer.userId}>
          <HospitalHeader>
            <div>
              <HospitalName>{transfer.hospitalName}</HospitalName>
              <TransferInfo>
  <TransferInfoItem>
    <TransferLabel>시작:</TransferLabel>
    <TransferValue>{formatDate(transfer.startTime)}</TransferValue>
  </TransferInfoItem>
  <TransferInfoItem>
    <TransferLabel>완료:</TransferLabel>
    <TransferValue>{formatDate(transfer.endTime)}</TransferValue>
  </TransferInfoItem>
</TransferInfo>
            </div>
            <TransferStatus>이송 완료</TransferStatus>
          </HospitalHeader>

          <InfoGrid>
            <InfoCard>
              <InfoLabel>성별</InfoLabel>
              <InfoValue>
                {transfer.gender === 'MALE' ? '남성' : 
                 transfer.gender === 'FEMALE' ? '여성' : '미상'}
              </InfoValue>
            </InfoCard>

            <InfoCard>
              <InfoLabel>연령대</InfoLabel>
              <InfoValue>
                {transfer.ageGroup === 'FORTIES' ? '40대' : 
                 transfer.ageGroup === 'FIFTIES' ? '50대' : transfer.ageGroup}
              </InfoValue>
            </InfoCard>

            <InfoCard>
              <InfoLabel>진료 구분</InfoLabel>
              <InfoValue>
                {transfer.medical === 'DISEASE' ? '질병' : 
                 transfer.medical === 'TRAUMA' ? '외상' : transfer.medical}
              </InfoValue>
            </InfoCard>

            <InfoCard>
              <InfoLabel>의식 수준</InfoLabel>
              <InfoValue>{transfer.consciousnessLevel}</InfoValue>
            </InfoCard>

            <InfoCard color="#fee2e2">
              <InfoLabel>혈압</InfoLabel>
              <InfoValue>{transfer.bloodPressure} mmHg</InfoValue>
            </InfoCard>

            <InfoCard color="#ffedd5">
              <InfoLabel>맥박</InfoLabel>
              <InfoValue>{transfer.heartRate} bpm</InfoValue>
            </InfoCard>

            <InfoCard color="#fef3c7">
              <InfoLabel>체온</InfoLabel>
              <InfoValue>{transfer.temperature}°C</InfoValue>
            </InfoCard>

            <InfoCard color="#dbeafe">
              <InfoLabel>호흡수</InfoLabel>
              <InfoValue>{transfer.respiration} /min</InfoValue>
            </InfoCard>
          </InfoGrid>
        </TransferItem>
      ))}
    </CompletedTransfersSection>
  );
};

export default CompletedTransferStatus;