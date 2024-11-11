import React from 'react';
import styled from 'styled-components';
import HospitalCard from '../../components/HospitalCard/HospitalCard';

const PageWrapper = styled.div`
  padding: 24px;
  background: #F8F9FA;
  min-height: 100vh;
`;

const HospitalListPage = () => {
  return (
    <PageWrapper>
      <HospitalCard />
    </PageWrapper>
  );
};

export default HospitalListPage;