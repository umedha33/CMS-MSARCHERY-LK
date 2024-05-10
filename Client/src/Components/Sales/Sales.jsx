import React, { useEffect, useState } from 'react';
import './Sales.css';
import OrdersChart from '../Charts/OrdersChart/OrdersChart';
import EmpLogChart from './../Charts/EmpLogChart/EmpLogChart';


const Sales = () => {

  return (
    <div className='sales-rprts-container'>
      <OrdersChart />
      {/* <EmpLogChart /> */}
    </div>
  );
};

export default Sales;
