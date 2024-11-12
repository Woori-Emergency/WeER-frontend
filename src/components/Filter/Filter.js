import React, { useState } from 'react';
import * as S from './Filter.styles';
import locationData from '../../data/koprov.json'; 

const Filter = () => {
  // 위치 관련 상태 - 서울특별시를 기본값으로 설정
  const [selectedCity, setSelectedCity] = useState('서울특별시');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);

  // 기존 필터 상태
  const [erItems, setErItems] = useState({
    일반: false,
    소아: false,
    외상소생실: false,
    '코호트 격리': false,
    '음압 격리': false,
    '일반 격리': false,
  });

  const [icuItems, setIcuItems] = useState({
    일반: false,
    '음압 격리': false,
    소아: false,
    신생아: false,
    내과: false,
    외과: false,
  });

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

      <S.SearchButton>검색</S.SearchButton>
    </S.Container>
  );
};

export default Filter;