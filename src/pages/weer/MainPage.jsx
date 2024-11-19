import React, { useState, useEffect } from 'react';
import Search from '../../components/Search/Search';
import StatusButtons from '../../components/StatusButtons/StatusButtons';
import KakaoMap from '../../components/Map/Map';
import FilterButtons from '../../components/patientStatus/FilterButtons';
import { ContentWrapper, TopContainer } from '../../styles/CommonStyles';
import { useGeoLocation } from '../../components/GeoLocation/GeoLocation';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { hospitalList } from '../../data/HospitalList';
import { API_BASE_URL } from '../../components/api/config';


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
    const selectedHospitalData = hospitalList.find(hospital => hospital.name === value);
    if(!selectedHospitalData) return;
    console.log(selectedHospitalData);
    try{
      const response = await fetch(`${API_BASE_URL}/hospital/detail?hospitalid=${selectedHospitalData.id}`)
      console.log(response);
      const data = await response.json();
      if (data.status === 200){
        setSelectedHospital(value);
        form.setFieldValue({organization: value});
        console.log("검색창 Form = ",form);
        if (data.result) {
          const formattedHospital = {
            ...data.result,
            duration: Math.ceil(data.result.duration || 0)
          };
          setHospitals([formattedHospital]);

          setMapCenter({
            lat: formattedHospital.latitude,
            lng: formattedHospital.longitude
          });
        }
      }
    } catch (error){
      console.error("검색창 에러 : ", error);
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
      <KakaoMap center={mapCenter} hospitals={hospitals} />
      <FilterButtons 
        onDistanceSort={handleDistanceSort}
        onEmergencyFilter={handleFilterSearch}
      />
    </ContentWrapper>
  );
};

export default MainPage;