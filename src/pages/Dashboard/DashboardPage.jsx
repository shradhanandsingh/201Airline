import React from 'react';
import './Dashboard.css'
import PassengerAdmin from './PassengerAdmin';

const DashboardPage = () => {
  return (
    <>
      <div className="tablewrapper">
        <PassengerAdmin />
      </div>
    </>
  );
};

export default DashboardPage;