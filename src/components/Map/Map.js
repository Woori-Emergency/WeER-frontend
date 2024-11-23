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

// 마커 이미지 경로 상수 정의
const MARKER_IMAGES = {
  available: '/images/marker/available.png',
  busy: '/images/marker/busy.png',
  unavailable: '/images/marker/unavailable.png',
};

const KakaoMap = ({ center, hospitals = [], selectedHospital }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  // 거리(m)를 km로 변환하는 함수
  const formatDistance = (distance) => {
    return (distance / 1000).toFixed(1); // 소수점 첫째 자리까지 표시
  };

  // 초 단위를 분 단위로 변환하는 함수
  const formatDuration = (duration) => {
    return Math.round(duration / 60); // 분 단위로 표시
  };

  // hvec 값에 따라 마커 이미지를 결정하는 함수
  const getMarkerImage = (availableBeds, totalBeds) => {
    const available = ( availableBeds / totalBeds );
    if ( available >= 0.5 ) return MARKER_IMAGES.available;
    if ( available < 0.5 && available > 0 ) return MARKER_IMAGES.busy;
    return MARKER_IMAGES.unavailable;
  };

  // 병원을 선택했을 때 자동으로 선택된 병원의 마커를 클릭
  useEffect(()=>{
    if(selectedHospital){
      const hospital = hospitals.find((h) => h.hospitalName === selectedHospital);
      if(hospital){
        console.log("Map.js -> hospital {}",hospital);
        setSelectedMarker(hospital.hospitalName);
      }
    }
  }, [selectedHospital, hospitals]);

  return (
    <MapContainer>
      <Map center={center} style={{ width: "100%", height: "100%" }} level={3}>
        {hospitals.map((hospital) => (
          <React.Fragment key={hospital.hospitalName}>
            <MapMarker
              position={{ lat: hospital.latitude, lng: hospital.longitude }}
              onClick={() => setSelectedMarker(selectedMarker === hospital.hospitalName ? null : hospital.hospitalName)}
              image={{
                src: getMarkerImage(hospital.availableBeds, hospital.totalBeds), // hvec 값에 따른 이미지 결정
                size: { width: 50, height: 55 },
              }}
            />
            {selectedMarker === hospital.hospitalName && (
              <CustomOverlayMap position={{ lat: hospital.latitude, lng: hospital.longitude }} yAnchor={1.3}>
                <S.CustomOverlayWrapper>
                  <S.HospitalName>{hospital.hospitalName}</S.HospitalName>
                  <S.InfoItem>거리: {formatDistance(hospital.roadDistance)} km</S.InfoItem> {/* km 단위로 표시 */}
                  <S.InfoItem>예상 소요시간: {formatDuration(hospital.duration)}분</S.InfoItem> {/* 분 단위로 표시 */}
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