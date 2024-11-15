import React, { useState } from 'react';
import * as S from './Filter.styles';
import locationData from '../../data/koprov.json'; 
import { useGeoLocation } from '../GeoLocation/GeoLocation';
import { useNavigate } from 'react-router-dom';

const geolocationOptions = {
  enableHighAccuracy: false,  // 일반적인 정확도 사용
  timeout: 1000 * 15,        // 15초 타임아웃
  maximumAge: 1000 * 60 * 5  // 5분 캐시 허용
};


const Filter = () => {
  // 위치 관련 상태 - 서울특별시를 기본값으로 설정
  const [selectedCity, setSelectedCity] = useState('서울특별시');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const { location: geoLocation, error: locationError } = useGeoLocation(geolocationOptions);

  const navigate = useNavigate();
  // 응급실
  const [erItems, setErItems] = useState({
    일반: false, // backend -> hvec
    '코호트 격리': false,
    '음압 격리':false,
    '일반 격리':false,
    '소아 격리':false,
    '소아 음압 격리':false,
    '소아 일반 격리':false,
  });

  const erKeyMapping = {
    '일반': "hvec", 
    '코호트 격리':"hv27",
    '음압 격리':"hv29",
    '일반 격리':"hv30",
    '소아 격리':"hv28",
    '소아 음압 격리':"hv15",
    '소아 일반 격리':"hv16",
  }

  // 중환자실
  const [icuItems, setIcuItems] = useState({
    신경과: false,
    신생아: false,
    흉부외과: false,
    내과: false,
    외과: false,
    신경외과: false,
    화상: false,
    외상: false,
    소아: false,
    심장내과: false,
    "음압 격리": false,
    "일반 병상": false,
  });

  const icuKeyMapping = {
    "신경과": "hvcc",
    "신생아": "hvncc",
    "흉부외과": "hvccc",
    "내과": "hv2",
    "외과": "hv3", 
    "신경외과": "hv6",
    "화상": "hv8",
    "외상": "hv9",
    "소아": "hv32",
    "심장내과": "hv34",
    "음압 격리": "hv35",
    "일반 병상": "hvicc"
  }

  // 장비
  const [equipmentItems, setEquipmentItems] = useState({
    '인공호흡기 일반': false,
    '인공호흡기 조산아용': false,
    '인큐베이터': false,
    'CRRT': false,
    'ECMO': false,
    '중심체온조절 장치': false,
    '고압 산소 치료기': false,
    'CT 스캔': false,
    'MRI': false,
    '혈관촬영기': false,
  });

  const equipKeyMapping = {
    '인공호흡기 일반':  "hvventiAYN",
    '인공호흡기 조산아용': "hvventisoAYN",
    '인큐베이터': "hvinCUAYN",
    'CRRT':   "hvcrrTAYN",
    'ECMO': "hvecmoAYN",
    '중심체온조절 장치':  "hvhypoAYN",
    '고압 산소 치료기': "hvoxyAYN",
    'CT 스캔': "hvctAYN",
    'MRI':  "hvmriAYN",
    '혈관촬영기':  "hvangioAYN"
  }

  // 위치 선택 핸들러
  const handleCityClick = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
    setIsDistrictDropdownOpen(false);
  };

  const handleDistrictClick = () => {
    setIsDistrictDropdownOpen(!isDistrictDropdownOpen);
    setIsCityDropdownOpen(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict('');
    setIsCityDropdownOpen(false);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setIsDistrictDropdownOpen(false);
  };

  const handleLocationRefresh = () => {
    setSelectedCity('서울특별시');  // 초기화할 때도 서울특별시로 설정
    setSelectedDistrict('');
  };

  // 기존 필터 핸들러
  const handleCheckboxChange = (section, item) => {
    const setters = {
      er: setErItems,
      icu: setIcuItems,
      equipment: setEquipmentItems,
    };

    setters[section]((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleSelectAll = (section) => {
    const items = {
      er: erItems,
      icu: icuItems,
      equipment: equipmentItems,
    };

    const setters = {
      er: setErItems,
      icu: setIcuItems,
      equipment: setEquipmentItems,
    };

    const allSelected = Object.values(items[section]).every((value) => value);
    
    setters[section](
      Object.keys(items[section]).reduce((acc, key) => {
        acc[key] = !allSelected;
        return acc;
      }, {})
    );
  };

  const handleSubmit = async (lat, lon) => {
    const mapSectionData = (items, mapping) => {
      return Object.entries(items).reduce((acc, [key, value]) => {
        const backendKey = mapping[key];
        if (backendKey) {
          acc[backendKey] = value;
        }
        return acc;
      }, {});
    };

    const backendData = {
      ...mapSectionData(erItems, erKeyMapping),
      ...mapSectionData(icuItems, icuKeyMapping),
      ...mapSectionData(equipmentItems, equipKeyMapping),
      city: selectedCity,
      state: selectedDistrict
    };
    console.log(backendData);
    console.log(geoLocation.latitude);
    console.log(geoLocation.longitude);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8080/hospital/info?lat=${geoLocation.latitude}&lon=${geoLocation.longitude}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(backendData)
      });

      if (!response.ok) {
        throw new Error('필터 적용에 실패했습니다.');
      }

      const data = await response.json();
      console.log("네비게이션 전 - hospitalData:", data.result);
      navigate('/hospital-list', { 
        state: { 
          hospitalData : data.result
        } 
      });
    } catch (error) {
      console.error('필터 적용 중 오류 발생:', error);
    }
  };

  return (
    <S.Container>
      <S.FilterTitleHeader>
        필터링 검색
      </S.FilterTitleHeader>

      <S.LocationSection className="location-dropdown">
        <S.SelectBoxContainer>
          <S.SelectBox onClick={handleCityClick}>
            <S.LocationIcon />
            {selectedCity}
          </S.SelectBox>
          {isCityDropdownOpen && (
            <S.DropdownList>
              {Object.keys(locationData).map((city) => (
                <S.DropdownItem
                  key={city}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </S.DropdownItem>
              ))}
            </S.DropdownList>
          )}
        </S.SelectBoxContainer>

        <S.SelectBoxContainer>
          <S.SelectBox onClick={handleDistrictClick}>
            <S.LocationIcon />
            {selectedDistrict || '선택'}
          </S.SelectBox>
          {isDistrictDropdownOpen && (
            <S.DropdownList>
              {locationData[selectedCity]?.map((district) => (
                <S.DropdownItem
                  key={district}
                  onClick={() => handleDistrictSelect(district)}
                >
                  {district}
                </S.DropdownItem>
              ))}
            </S.DropdownList>
          )}
        </S.SelectBoxContainer>

        <S.RefreshButton onClick={handleLocationRefresh}>
          <S.RefreshIcon />
        </S.RefreshButton>
      </S.LocationSection>

      <S.FilterSection>
        <S.FilterTitle>응급실</S.FilterTitle>
        <S.FilterGrid>
          {Object.keys(erItems).map((item) => (
            <S.CheckboxItem key={`er-${item}`}>
              <S.Checkbox
                type="checkbox"
                id={`er-${item}`}
                checked={erItems[item]}
                onChange={() => handleCheckboxChange('er', item)}
              />
              <S.Label htmlFor={`er-${item}`}>
                {item}
              </S.Label>
            </S.CheckboxItem>
          ))}
        </S.FilterGrid>
        <S.SelectAllButton onClick={() => handleSelectAll('er')}>
          전체 선택
        </S.SelectAllButton>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterTitle>중환자실</S.FilterTitle>
        <S.FilterGrid>
          {Object.keys(icuItems).map((item) => (
            <S.CheckboxItem key={`icu-${item}`}>
              <S.Checkbox
                type="checkbox"
                id={`icu-${item}`}
                checked={icuItems[item]}
                onChange={() => handleCheckboxChange('icu', item)}
              />
              <S.Label htmlFor={`icu-${item}`}>
                {item}
              </S.Label>
            </S.CheckboxItem>
          ))}
        </S.FilterGrid>
        <S.SelectAllButton onClick={() => handleSelectAll('icu')}>
          전체 선택
        </S.SelectAllButton>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterTitle>장비</S.FilterTitle>
        <S.FilterGrid>
          {Object.keys(equipmentItems).map((item) => (
            <S.CheckboxItem key={`equipment-${item}`}>
              <S.Checkbox
                type="checkbox"
                id={`equipment-${item}`}
                checked={equipmentItems[item]}
                onChange={() => handleCheckboxChange('equipment', item)}
              />
              <S.Label htmlFor={`equipment-${item}`}>
                {item}
              </S.Label>
            </S.CheckboxItem>
          ))}
        </S.FilterGrid>
        <S.SelectAllButton onClick={() => handleSelectAll('equipment')}>
          전체 선택
        </S.SelectAllButton>
      </S.FilterSection>

      <S.SearchButton onClick={() => handleSubmit(geoLocation.latitude, geoLocation.longitude)}>
        검색
      </S.SearchButton>
    </S.Container>
  );
};

export default Filter;