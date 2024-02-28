import React, { useState } from 'react'
import './Employees.css'
import empDummy from '../Assets/emp-dummy.js'

const Employees = ({ activeNavElem }) => {

  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState('All');

  const filteredData = empDummy.filter(emp => {
    if (selectedBreadcrumb === 'All') return true;
    return emp.status === selectedBreadcrumb;
  });

  const assignClick = (item) => {
    activeNavElem(item);
  };

  return (
    // <div>
    //   <h1>Employees</h1>
    //   <p>list of employees with all the details.</p>
    //   <p>should add log in and out times or active/offline.</p>
    //   <p>each employee should be displayed as seperate cards.</p>
    //   <p>add new employees with user credentials.</p>
    // </div>

    <div>
      <div className="employee-container">

        <div className="row1-employee-header">
          <h1>Employees</h1>
          <button onClick={() => { assignClick('Assign EMP'); }}>Add EMP</button>
        </div>

        <div className="row2-sort-header">
          <div className="bread-crum">
            <h2 className={selectedBreadcrumb === 'All' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('All')}>All</h2>
            <h2 className={selectedBreadcrumb === 'Online' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Online')}>Online</h2>
            <h2 className={selectedBreadcrumb === 'Offline' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Offline')}>Offline</h2>
          </div>
        </div>

        <div className="row3-employee-card-set">

          <div className="emp-cards">
            {filteredData.map(emp => (
              <div key={emp.id} className={`empCard ${emp.status === 'Online' ? 'online' : ''}`}>
                <img src={emp.dp} alt="dp-image" />
                <div className="info-set">
                  <h3>Post: <span class="emp-tag">{emp.empPost}</span></h3>
                  <h3>Name: <span class="emp-tag">{emp.empName}</span></h3>
                  <h3>ID: <span class="emp-tag">{emp.empID}</span></h3>
                  <h3>Status: <span class="emp-tag">{emp.status}</span></h3>
                  <h3>Contact: <span class="emp-tag">{emp.contact}</span></h3>
                  <h3>Email: <span class="emp-tag">{emp.email}</span></h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Employees
