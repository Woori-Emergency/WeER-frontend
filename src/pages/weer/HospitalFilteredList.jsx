import React from 'react';
import HospitalFilteredCard from '../../components/FilteredList/HospitalFilteredCard';
import { ContentWrapper } from '../../styles/CommonStyles';


const HospitalFilteredList = () => {
  return (
    <ContentWrapper>
      <HospitalFilteredCard />
    </ContentWrapper>
  );
};

export default HospitalFilteredList;