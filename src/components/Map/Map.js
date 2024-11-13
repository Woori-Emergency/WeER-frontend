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
  const [hospitals, setHospitals] = useState([]); 
  const [markerSize, setMarkerSize] = useState({ width: 50, height: 55 }); 

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/hospital/seoul');
        const data = await response.json();
        // API 응답 데이터를 맵에서 사용할 수 있는 형식으로 변환
        const formattedHospitals = data.map(hospital => ({
          id: hospital.id,
          name: hospital.name,
          position: {
            lat: parseFloat(hospital.latitude || hospital.lat),
            lng: parseFloat(hospital.longitude || hospital.lng)
          },
          status: hospital.status || 'unavailable',
          distance: hospital.distance || '정보없음',
          waitingTime: hospital.waitingTime || '정보없음'
        }));
        setHospitals(formattedHospitals);
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
        setHospitals([]); // 에러 발생 시 빈 배열로 초기화
      }
    };
    fetchHospitals();
  }, []);

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

  // hospitals가 undefined이거나 배열이 아닐 경우 빈 배열로 처리
  const hospitalList = Array.isArray(hospitals) ? hospitals : [];

  return (
    <MapContainer>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        {hospitalList.map((hospital) => (
          <React.Fragment key={hospital.id}>
            {hospital.position && hospital.position.lat && hospital.position.lng && (
              <>
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
              </>
            )}
          </React.Fragment>
        ))}
      </Map>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={() => setMarkerSize({ width: 40, height: 45 })}>작게</button>
        <button onClick={() => setMarkerSize({ width: 50, height: 55 })}>보통</button>
        <button onClick={() => setMarkerSize({ width: 60, height: 65 })}>크게</button>
      </div>
    </MapContainer>
  );
};

export default KakaoMap;