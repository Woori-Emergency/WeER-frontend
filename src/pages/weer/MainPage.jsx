import React, { useState, useEffect } from 'react';
import Search from '../../components/Search/Search';
import StatusButtons from '../../components/StatusButtons/StatusButtons';
import KakaoMap from '../../components/Map/Map';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import {
  ContentWrapper,
  TopContainer,
} from '../../styles/CommonStyles';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [hospitals, setHospitals] = useState([]); // 병원 데이터를 저장할 상태 변수
  const [filteredHospitals, setFilteredHospitals] = useState([]); // 필터링된 병원 리스트

  // 병원 데이터 가져오기
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/hospital/seoul'); // 백엔드 API 호출
        if (!response.ok) {
          throw new Error('Failed to fetch hospital data');
        }
        const result = await response.json();
        setHospitals(result);
        setFilteredHospitals(result); // 초기에는 모든 병원을 표시
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchHospitals();
  }, []);

  // 검색 처리
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = hospitals.filter((hospital) =>
      hospital.name.includes(query)
    );
    setFilteredHospitals(filtered);

    // 검색 결과에 따라 지도 중심 변경
    if (filtered.length > 0) {
      setMapCenter({
        lat: filtered[0].latitude,
        lng: filtered[0].longitude,
      });
    } else {
      alert('검색 결과가 없습니다.');
    }
  };

  // 상태 필터 처리
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // 예를 들어, "이용 가능" 상태에 맞게 필터링할 수 있음
    const filtered = hospitals.filter((hospital) => hospital.status === status);
    setFilteredHospitals(filtered);
  };

  // 거리순 정렬
  // TODO
  const handleDistanceSort = () => {
    navigate('/hospital-list');
  };

  // 필터링 검색
  // TODO
  const handleFilterSearch = () => {
    navigate('/hospital/filter');
  };

  return (
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
        hospitals={filteredHospitals} // 필터링된 병원 데이터 전달
      />

      <FilterButtons 
        onDistanceSort={handleDistanceSort}
        onEmergencyFilter={handleFilterSearch}
      />
    </ContentWrapper>
  );
};

export default MainPage;