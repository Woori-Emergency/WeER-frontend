import React, { useState } from 'react';
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

const KakaoMap = ({ center, hospitals = [] }) => {
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
  const getMarkerImage = (hvec) => {
    if (hvec >= 10) return MARKER_IMAGES.available;
    if (hvec >= 5) return MARKER_IMAGES.busy;
    return MARKER_IMAGES.unavailable;
  };

  return (
    <MapContainer>
      <Map center={center} style={{ width: "100%", height: "100%" }} level={3}>
        {hospitals.map((hospital) => (
          <React.Fragment key={hospital.hospitalId}>
            <MapMarker
              position={{ lat: hospital.latitude, lng: hospital.longitude }}
              onClick={() => setSelectedMarker(selectedMarker === hospital.hospitalId ? null : hospital.hospitalId)}
              image={{
                src: getMarkerImage(hospital.emergencyId?.hvec), // hvec 값에 따른 이미지 결정
                size: { width: 50, height: 55 },
              }}
            />
            {selectedMarker === hospital.hospitalId && (
              <CustomOverlayMap position={{ lat: hospital.latitude, lng: hospital.longitude }} yAnchor={1.3}>
                <S.CustomOverlayWrapper>
                  <S.HospitalName>{hospital.name}</S.HospitalName>
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