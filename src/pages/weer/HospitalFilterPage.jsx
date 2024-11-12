import React from 'react';
import styled from 'styled-components';
import Filter from '../../components/Filter/Filter';

const HospitalFilterPage = () => {
  return (
    <Container>
      <Filter />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #F8F9FA;
  padding: 20px;
`;

export default HospitalFilterPage;