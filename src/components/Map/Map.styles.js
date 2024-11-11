import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

export const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

export const LayersButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
`;

export const CustomOverlayWrapper = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  max-width: 250px;
`;

export const HospitalName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

export const InfoItem = styled.div`
  font-size: 14px;
  margin: 4px 0;
  color: #666;
`;