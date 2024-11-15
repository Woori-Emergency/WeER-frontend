import React, { useState, useEffect } from 'react';
import { formatValue } from '../../utils/formatValue';
import * as S from '../HospitalCard/HospitalCard.styles';  // 기존 스타일 재사용

const Emergency = ({ hospitalId }) => {
    const [erData, setErData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchErData = async () => {
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
            throw new Error('응급실 정보를 가져오는데 실패했습니다.');
          }
  
          const data = await response.json();
          setErData(data.result.emergencyId);
          console.log(data.result.emergencyId);
        } catch (error) {
          console.error('응급실 데이터 조회 실패:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (hospitalId) {
        fetchErData();
      }
    }, [hospitalId]);
  
    if (loading) return <S.Section><div>로딩 중...</div></S.Section>;
    if (error) return <S.Section><div>데이터 로드 실패</div></S.Section>;
    if (!erData) return null;
  
      return (
        <S.Section>
          <S.SectionTitle>응급실</S.SectionTitle>
          <S.InfoGrid>
            <S.GridRow>
              <S.Label>일반</S.Label>
              <S.Value>
                {(() => {
                  const value = formatValue(erData.hvec, erData.hvs01);
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
              <S.Label>코호트 격리</S.Label>
              <S.Value>
                {(() => {
                  const value = formatValue(erData.hv27, erData.hvs59);
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
              <S.Label>음압 격리</S.Label>
              <S.Value>
                {(() => {
                  const value = formatValue(erData.hv29, erData.hvs52);
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
              <S.Label>일반 격리</S.Label>
              <S.Value>
                {(() => {
                  const value = formatValue(erData.hv30, erData.hvs51);
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
              <S.Label>소아 격리</S.Label>
              <S.Value>
                {(() => {
                  const value = formatValue(erData.hv28, erData.hvs02);
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
              <S.Label>소아 음압 격리</S.Label>
              <S.Value>
                {(() => {
                  const value = formatValue(erData.hv15, erData.hvs48);
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
              <S.Label>소아 일반 격리</S.Label>
              <S.Value>
                {(() => {
                  const value = formatValue(erData.hv16, erData.hvs49);
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

export default Emergency ;