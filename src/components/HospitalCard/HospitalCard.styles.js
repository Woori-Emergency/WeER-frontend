import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding-bottom: 24px;
`;

export const Header = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const HospitalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HospitalName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2B4570;
  margin: 0;
`;

export const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: #7EB09B;
  border-radius: 50%;
`;

export const Distance = styled.span`
  margin-left: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const InfoButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #405880;
  background: white;
  color: #405880;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ReservationButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #E97132; // 테두리 색상 추가
  background: white;
  color: #E97132;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #d65f21;
  }
`;

export const ContentLayout = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Section = styled.div`
  flex: 1;
`;

// 응급실, 중환자실 색상
export const SectionTitle = styled.div`
  padding: 12px 24px;
  background: #405880;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const GridRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #666;
`;

export const Value = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const StatusIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.isAvailable ? '#7EB09B' : '#D64045'};
  color: white;
  font-size: 10px;
  
  &::after {
    content: '${props => props.isAvailable ? '✓' : '×'}';
  }
`;

export const NoticeLink = styled(Link)`
  margin: 20px 24px 0;
  padding: 12px 24px;
  background: #F8F9FA;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 48px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #F1F3F5;
  }
`;

export const NoticeBar = styled.div`
  position: absolute;
  left: 12px;
  top: 8px;
  bottom: 8px;
  width: 4px;
  background: #d65f21;
  border-radius: 2px;
`;

export const NoticeIcon = styled.span`
  margin-left: 12px;
  margin-right: 8px;
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 장비 Modal
export const ModalTitle = styled.h3`
  text-align: center;
  color: white;
  background: #405880;
  padding: 16px;
  border-radius: 8px;
  margin: 0 0 24px 0;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Modal = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalContent = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding: 0 4px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f3f5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dee2e6;
    border-radius: 4px;
  }
`;

export const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 40px;
  padding: 0 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EquipmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background: ${props => props.available ? '#f8f9fa' : '#fff'};
  border-bottom: 1px solid #e9ecef;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.available ? '#f1f3f5' : '#f8f9fa'};
  }
`;

export const EquipmentLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #405880;
`;

export const EquipmentStatus = styled.span`
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${props => props.available ? '#7EB09B20' : '#D6404520'};
  color: ${props => props.available ? '#2b8a3e' : '#D64045'};
  min-width: 90px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.available ? '#2b8a3e' : '#D64045'};
  }
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #405880;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 24px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  transition: background-color 0.2s;
  
  &:hover {
    background: #2B4570;
  }
`;