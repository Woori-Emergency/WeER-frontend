import React, { useState } from 'react';
import Search from '../../components/Search/Search';
import StatusButtons from '../../components/StatusButtons/StatusButtons';
import KakaoMap from '../../components/Map/Map';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import {
  PageWrapper,
  Container,
  ContentWrapper,
  TopContainer,
} from '../../styles/CommonStyles';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  // 상태 관리
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567
  });

  // 검색 처리
  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: 검색 로직 구현
    // - 키워드로 병원 검색
    // - 검색 결과에 따라 지도 중심 이동
    // - 마커 업데이트
  };

  // 상태 필터 처리
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // TODO: 필터링 로직 구현
    // - 선택된 상태에 따라 마커 필터링
    // - UI 업데이트
  };

  // 거리순 정렬
  const handleDistanceSort = () => {
    navigate('/hospital-list');
  };

  // 필터링 검색
  const handleFilterSearch = () => {
    navigate('/hospital/filter');
  };

  return (
    <ContentWrapper>
      <TopContainer>
        <Search/>
        <StatusButtons
          onStatusChange={handleStatusChange}
          selectedStatus={selectedStatus}
        />
      </TopContainer>

      <KakaoMap
        center={mapCenter}
        searchQuery={searchQuery}
        selectedStatus={selectedStatus}
      />

      <FilterButtons 
        onDistanceSort={handleDistanceSort}
        onEmergencyFilter={handleFilterSearch}
      />
    </ContentWrapper>
  );
};

export default MainPage;