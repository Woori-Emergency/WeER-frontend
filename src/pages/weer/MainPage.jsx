// pages/weer/MainPage.jsx
import React, { useState } from 'react';
import Search from '../../components/Search/Search';
import StatusButtons from '../../components/StatusButtons/StatusButtons';
import KakaoMap from '../../components/Map/Map';
import { 
  PageWrapper, 
  Container, 
  ContentWrapper,
  TopContainer,
  ButtonContainer,
  ActionButton
} from '../../styles/CommonStyles';

const MainPage = () => {
  // 상태 관리
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

  // 레이어 변경 처리
  const handleLayerChange = () => {
    // TODO: 지도 레이어 변경 로직 구현
    // - 일반 지도 / 위성 지도 전환
    // - 교통 정보 표시/숨김
  };

  // 거리순 정렬
  const handleDistanceSort = () => {
    // TODO: 거리순 정렬 로직 구현
    // - 현재 위치 기준 거리 계산
    // - 목록 정렬
    // - UI 업데이트
  };

  // 필터링 검색
  const handleFilterSearch = () => {
    // TODO: 상세 필터링 검색 로직 구현
    // - 진료과목, 운영시간 등 필터링
    // - 검색 결과 업데이트
  };

  return (
    <PageWrapper>
      <Container>
        <ContentWrapper>
          <TopContainer>
            <Search onSearch={handleSearch} />
            <StatusButtons 
              onStatusChange={handleStatusChange}
              selectedStatus={selectedStatus}
            />
          </TopContainer>

          <KakaoMap 
            center={mapCenter}
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            onLayerChange={handleLayerChange}
          />

          <ButtonContainer>
            <ActionButton onClick={handleDistanceSort}>
              거리순 보기
              <span>→</span>
            </ActionButton>
            <ActionButton onClick={handleFilterSearch}>
              응급실 필터링검색
              <span>→</span>
            </ActionButton>
          </ButtonContainer>
        </ContentWrapper>
      </Container>
    </PageWrapper>
  );
};

export default MainPage;