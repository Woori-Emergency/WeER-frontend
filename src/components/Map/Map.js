import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import * as S from './Map.styles';

const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
`;

const KakaoMap = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hospitals, setHospitals] = useState([]); // 백엔드 데이터 저장
  const [markerSize, setMarkerSize] = useState({ width: 50, height: 55 }); // 마커 크기 상태

  // 백엔드에서 병원 데이터 가져오기
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/hospital/seoul'); // 병원 데이터 API 호출
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
      }
    };
    fetchHospitals();
  }, []);

  // 마커 이미지 가져오기
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
                size: markerSize,
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
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {/* 마커 크기 조절 버튼 */}
        <button onClick={() => setMarkerSize({ width: 40, height: 45 })}>작게</button>
        <button onClick={() => setMarkerSize({ width: 50, height: 55 })}>보통</button>
        <button onClick={() => setMarkerSize({ width: 60, height: 65 })}>크게</button>
      </div>
    </MapContainer>
  );
};

export default KakaoMap;