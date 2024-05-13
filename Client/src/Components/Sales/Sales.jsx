import React, { useEffect, useState } from 'react';
import './Sales.css';
import OrdersChart from '../Charts/OrdersChart/OrdersChart';
import EmpLogChart from './../Charts/EmpLogChart/EmpLogChart';
import ExpensesChart from '../ExpensesChart/ExpensesChart';


const Sales = () => {

  return (
    <div className='sales-rprts-container'>
      <div className="scroll-contnr">
        <OrdersChart />
        <EmpLogChart />
        <ExpensesChart />
      </div>
    </div>
  );
};

export default Sales;
