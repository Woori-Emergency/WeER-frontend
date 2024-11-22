import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeoLocation } from '../../components/GeoLocation/GeoLocation';
import KakaoMap from '../../components/Map/Map';
import Search from '../../components/Search/Search';
import StatusButtons from '../../components/StatusButtons/StatusButtons';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import { ContentWrapper, TopContainer } from '../../styles/CommonStyles';
import { Form } from 'antd';

const MainPage = () => {
  const { location, error } = useGeoLocation();
  const [hospitals, setHospitals] = useState([]);
  const [form] = Form.useForm();
  const [selectedHospital, setSelectedHospital] = useState('');
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [range, setRange] = useState(1000); // 초기 범위 (100m)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (location.latitude && location.longitude) {
      console.log("Current Location:", location.latitude, location.longitude);

      const fetchHospitals = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/hospital/distance?lat=${location.latitude}&lon=${location.longitude}&range=${range}`,
            { method: 'POST' }
          );
          const data = await response.json();
          if (data.status === 200) {
            const formattedHospitals = data.result.map((hospital) => ({
              ...hospital,
              duration: Math.ceil(hospital.duration),
               // 초 단위를 분 단위로 변환
            }));
            setHospitals(formattedHospitals);
          } else {
            console.warn("Failed to fetch hospital data.");
          }
        } catch (error) {
          console.error("Error fetching hospital data:", error);
        }
      };

      fetchHospitals(); 

      setMapCenter({
        lat: location.latitude,
        lng: location.longitude,
      });
    }
  }, [location, range]); 

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
  
  const searchHospitalSelect = async (value) =>{
    const selectedHospitalData = hospitals.find(hospital => hospital.name === value);
    if(selectedHospitalData){
      setMapCenter({
        lat: selectedHospitalData.latitude,
        lng: selectedHospitalData.longitude
      });
      
      setSelectedHospital(selectedHospitalData.hospitalId);
     } else {
       console.warn("검색된 병원이 hospitals에 없습니다.");
    }
  };
  
  return (
    <ContentWrapper>
      <TopContainer>
      <Search
                setSelectedHospital={searchHospitalSelect}// Form 값 업데이트
              />
        <StatusButtons onStatusChange={() => {}} />
      </TopContainer>
      <KakaoMap center={mapCenter} hospitals={hospitals} selectedHospital={selectedHospital} />
      <FilterButtons 
        onDistanceSort={handleDistanceSort}
        onEmergencyFilter={handleFilterSearch}
      />
    </ContentWrapper>
  );
};

export default MainPage;