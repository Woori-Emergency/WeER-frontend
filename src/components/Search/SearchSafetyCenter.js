import { AutoComplete, Input } from 'antd';
import React, { useState } from 'react';
import { safetyCenter } from '../../data/safetyCenter';

const Search = ({ setSafetyCenter }) => {
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);

  // 병원 데이터에서 검색어에 맞는 병원만 필터링
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setOptions([]);
      return;
    }

    // 검색어와 병원 이름이 매칭되는 항목만 필터링
    const filteredSafetyCenter = safetyCenter
      .filter(center => center.name.toLowerCase().includes(value.toLowerCase()))
      .map(center => ({
        value: center.name,
        id: center.id, // 병원 ID 포함
      }));
  setOptions(filteredSafetyCenter);
  };

  // 병원 선택 시 호출되는 함수
  const handleSelect = (value) => {
    setSearchText(value); // 검색 텍스트를 선택된 값으로 설정
    setSafetyCenter(value); // 선택된 119 응급센터 이름을 상위 컴포넌트로 전달
  };

  // 엔터 입력 시 선택 확정
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && options.length > 0) {
      const selectedOption = options.find(option => option.value === searchText);
      if (selectedOption) {
        handleSelect(selectedOption.value);
      }
    }
  };

  return (
    <AutoComplete
      value={searchText}
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      style={{ width: '100%', borderRadius: '8px',    }}
      placeholder="기관 이름을 검색하세요."
    >
      <Input 
        onKeyPress={handleKeyPress} // 키보드 입력 처리
      />
    </AutoComplete>
  );
};

export default Search;
