import React, { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import * as S from './Map.styles';

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
`;

const KakaoMap = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 예시 병원 데이터
  const hospitals = [
    {
      id: 1,
      name: "A 종합병원",
      position: { lat: 37.566826, lng: 126.9786567 },
      status: "available",
      distance: "1.5km",
      waitingTime: "10분",
    },
    {
      id: 2,
      name: "B 대학병원",
      position: { lat: 37.565826, lng: 126.9776567 },
      status: "busy",
      distance: "2.1km",
      waitingTime: "30분",
    },
  ];

  // 마커 색상 결정
  const getMarkerImage = (status) => {
    switch (status) {
      case 'available':
        return '/images/marker/available.png';
      case 'busy':
        return '/images/marker/busy.png';
      case 'unavailable':
        return '/images/marker/unavailable.png';
      default:
        return '/images/marker/unavailable.png';
    }
  };

  return (
    <MapContainer>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        {hospitals.map((hospital) => (
          <React.Fragment key={hospital.id}>
             <MapMarker
              position={hospital.position}
              onClick={() => setSelectedMarker(selectedMarker === hospital.id ? null : hospital.id)}
              image={{
                src: getMarkerImage(hospital.status),
                size: { width: 50, height: 55 },
              }}
            />
            {selectedMarker === hospital.id && (
              <CustomOverlayMap
                position={hospital.position}
                yAnchor={1.3}
              >
                <S.CustomOverlayWrapper>
                  <S.HospitalName>{hospital.name}</S.HospitalName>
                  <S.InfoItem>거리: {hospital.distance}</S.InfoItem>
                  <S.InfoItem>예상 소요시간: {hospital.waitingTime}</S.InfoItem>
                </S.CustomOverlayWrapper>
              </CustomOverlayMap>
            )}
          </React.Fragment>
        ))}
      </Map>
    </MapContainer>
  );
};

export default KakaoMap;