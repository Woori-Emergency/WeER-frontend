import React from 'react';

const HospitalListPage = ({ hospitals }) => {
  return (
    <div>
      <h2>Nearby Hospitals</h2>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.hospitalId}>
            <h3>{hospital.name}</h3>
            <p>거리: {hospital.roadDistance}m</p>
            <p>예상 소요시간: {hospital.duration}s</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalListPage;