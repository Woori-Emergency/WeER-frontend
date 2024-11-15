import React, { useState, useEffect } from 'react';
import Search from '../../components/Search/Search';
import StatusButtons from '../../components/StatusButtons/StatusButtons';
import KakaoMap from '../../components/Map/Map';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import { ContentWrapper, TopContainer } from '../../styles/CommonStyles';
import { useGeoLocation } from '../../components/GeoLocation/GeoLocation';

const MainPage = () => {
  const { location, error } = useGeoLocation();
  const [hospitals, setHospitals] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [range, setRange] = useState(1000); // 초기 범위 (100m)
  
  useEffect(() => {
    if (location.latitude && location.longitude) {
      console.log("Current Location:", location.latitude, location.longitude);

      const fetchHospitals = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/hospital/distance?lat=${location.latitude}&lon=${location.longitude}&range=${range}`,
            { method: 'POST' }
          );
          const data = await response.json();
          if (data.status === 200) {
            const formattedHospitals = data.result.map((hospital) => ({
              ...hospital,
              duration: Math.ceil(hospital.duration),
               // 초 단위를 분 단위로 변환
            }));
            console.log(data.result.duration);
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

  return (
    <ContentWrapper>
      <TopContainer>
        <Search onSearch={() => {}} />
        <StatusButtons onStatusChange={() => {}} />
      </TopContainer>

      <KakaoMap center={mapCenter} hospitals={hospitals} />

      <FilterButtons onDistanceSort={() => {}} onEmergencyFilter={() => {}} />

    </ContentWrapper>
  );
};

export default MainPage;