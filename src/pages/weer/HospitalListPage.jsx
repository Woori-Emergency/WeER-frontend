import React from 'react';
import HospitalCard from '../../components/HospitalCard/HospitalCard';
import { ContentWrapper } from '../../styles/CommonStyles';
import styled from 'styled-components';

const HospitalListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0;
`;

const HospitalListPage = () => {
  return (
    <ContentWrapper>
      <HospitalListContainer>
        <HospitalCard />
      </HospitalListContainer>
    </ContentWrapper>
  );
};

export default HospitalListPage;