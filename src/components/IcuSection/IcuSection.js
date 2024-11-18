import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatValue } from '../../utils/formatValue';
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
            {(() => {
              const value = formatValue(icuData.hvicc, icuData.hvs17);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>내과</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hv2, icuData.hvs06);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>외과</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hv3, icuData.hvs07);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>음압격리</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hv35, icuData.hvs18);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>심장내과</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hv34, icuData.hvs15);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>신경외과</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hv6, icuData.hvs12);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>소아</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hv32, icuData.hvs09);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>신경과</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hvcc, icuData.hvs11);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>흉부외과</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hvccc, icuData.hvs16);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>신생아</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hvncc, icuData.hvs08);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
        <S.GridRow>
          <S.Label>화상</S.Label>
          <S.Value>
            {(() => {
              const value = formatValue(icuData.hv8, icuData.hvs13);
              return (
                <>
                  <S.StatusIcon isAvailable={value !== 'None'} />
                  {value}
                </>
              );
            })()}
          </S.Value>
        </S.GridRow>
      </S.InfoGrid>
    </S.Section>
  );
};

export default IcuSection;