import React from 'react';
import * as S from './Filter.styles';

const Filter = () => {
  return (
    <S.Container>
      <S.LocationSection>
        <S.SelectBox>
          <S.LocationIcon />
          시/도
        </S.SelectBox>
        <S.SelectBox>
          <S.LocationIcon />
          구
        </S.SelectBox>
        <S.RefreshButton>
          <S.RefreshIcon />
        </S.RefreshButton>
      </S.LocationSection>

      <S.FilterSection>
        <S.FilterTitle>응급실</S.FilterTitle>
        <S.FilterGrid>
          {['일반', '소아', '외상소생실', '코호트 격리', '음압 격리', '일반 격리'].map((item) => (
            <S.CheckboxItem key={`er-${item}`}>
              <S.Checkbox type="checkbox" id={`er-${item}`} />
              <S.Label htmlFor={`er-${item}`}>
                {item}
              </S.Label>
            </S.CheckboxItem>
          ))}
        </S.FilterGrid>
        <S.SelectAllButton>전체 선택</S.SelectAllButton>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterTitle>중환자실</S.FilterTitle>
        <S.FilterGrid>
          {['일반', '음압 격리', '소아', '신생아', '내과', '외과'].map((item) => (
            <S.CheckboxItem key={`icu-${item}`}>
              <S.Checkbox type="checkbox" id={`icu-${item}`} />
              <S.Label htmlFor={`icu-${item}`}>
                {item}
              </S.Label>
            </S.CheckboxItem>
          ))}
        </S.FilterGrid>
        <S.SelectAllButton>전체 선택</S.SelectAllButton>
      </S.FilterSection>

      <S.FilterSection>
        <S.FilterTitle>장비</S.FilterTitle>
        <S.FilterGrid>
          {[
            '인공호흡기 일반',
            '인공호흡기 조산아용',
            '인큐베이터',
            'CRRT',
            'ECMO',
            '중심체온조절 장치',
            '고압 산소 치료기',
            'CT 스캔',
            'MRI',
            '혈관촬영기'
          ].map((equipment) => (
            <S.CheckboxItem key={`equipment-${equipment}`}>
              <S.Checkbox type="checkbox" id={`equipment-${equipment}`} />
              <S.Label htmlFor={`equipment-${equipment}`}>
                {equipment}
              </S.Label>
            </S.CheckboxItem>
          ))}
        </S.FilterGrid>
        <S.SelectAllButton>전체 선택</S.SelectAllButton>
      </S.FilterSection>

      <S.SearchButton>검색</S.SearchButton>
    </S.Container>
  );
};

export default Filter;