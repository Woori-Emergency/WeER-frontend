import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as S from '../HospitalCard/HospitalCard.styles';  // 기존 스타일 재사용

const IcuSection = ({ hospitalId }) => {
    const [icuData, setIcuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchIcuData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8080/hospital/detail?hospitalid=${hospitalId}`, {
            method : 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            throw new Error('ICU 정보를 가져오는데 실패했습니다.');
          }
  
          const data = await response.json();
          setIcuData(data.result.icuId);
          console.log(data.result.icuId);
        } catch (error) {
          console.error('ICU 데이터 조회 실패:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (hospitalId) {
        fetchIcuData();
      }
    }, [hospitalId]);
  
    if (loading) return <S.Section><div>로딩 중...</div></S.Section>;
    if (error) return <S.Section><div>데이터 로드 실패</div></S.Section>;
    if (!icuData) return null;
  
    return (
      <S.Section>
        <S.SectionTitle>중환자실</S.SectionTitle>
        <S.InfoGrid>
          <S.GridRow>
            <S.Label>일반</S.Label>
            <S.Value>
              {icuData.hvicc}/{icuData.hvs17}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>내과</S.Label>
            <S.Value>
              {icuData.hv2 === 0 && icuData.hvs06 === 0 ? 'None' : `${icuData.hv2}/${icuData.hvs06}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>외과</S.Label>
            <S.Value>
              {icuData.hv3 === 0 && icuData.hvs07 === 0 ? 'None' : `${icuData.hv3}/${icuData.hvs07}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>음압격리</S.Label>
            <S.Value>
              {icuData.hv35 === 0 && icuData.hvs18 === 0 ? 'None' : `${icuData.hv35}/${icuData.hvs18}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>심장내과</S.Label>
            <S.Value>
              {icuData.hv34 === 0 && icuData.hvs15 === 0 ? 'None' : `${icuData.hv34}/${icuData.hvs15}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>신경외과</S.Label>
            <S.Value>
              {icuData.hv6 === 0 && icuData.hvs12 === 0 ? 'None' : `${icuData.hv6}/${icuData.hvs12}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>소아</S.Label>
            <S.Value>
              {icuData.hv32 === 0 && icuData.hvs09 === 0 ? 'None' : `${icuData.hv32}/${icuData.hvs09}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>신경과</S.Label>
            <S.Value>
              {icuData.hvcc === 0 && icuData.hvs11 === 0 ? 'None' : `${icuData.hvcc}/${icuData.hvs11}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>흉부외과</S.Label>
            <S.Value>
              {icuData.hvccc === 0 && icuData.hvs16 === 0 ? 'None' : `${icuData.hvccc}/${icuData.hvs16}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>신생아</S.Label>
            <S.Value>
              {icuData.hvncc === 0 && icuData.hvs08 === 0 ? 'None' : `${icuData.hvncc}/${icuData.hvs08}`}
            </S.Value>
          </S.GridRow>
          <S.GridRow>
            <S.Label>화상</S.Label>
            <S.Value>
              {icuData.hv8 === 0 && icuData.hvs13 === 0 ? 'None' : `${icuData.hv8}/${icuData.hvs13}`}
            </S.Value>
          </S.GridRow>
        </S.InfoGrid>
      </S.Section>
    );
  };

export default IcuSection;