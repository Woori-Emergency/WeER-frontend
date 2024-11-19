import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App = () => {
  const [options, setOptions] = useState([]);

  // 검색어에 따른 옵션을 설정하는 함수
  const getPanelValue = (searchText) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  // 항목이 선택되었을 때의 처리 함수
  const onSelect = (data) => {
    console.log('선택된 값:', data);
  };

  return (
    <AutoComplete
      options={options}  // 필터링된 옵션을 전달
      style={{
        width: 200,  // 스타일 설정
      }}
      onSelect={onSelect}  // 항목 선택 시 처리
      onSearch={(text) => setOptions(getPanelValue(text))}  // 검색어가 바뀔 때 옵션 업데이트
      placeholder="Search here"  // 검색창의 placeholder
    />
  );
};

export default hospitalSearch;
