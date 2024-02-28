import React, { useState } from 'react'
import './Employees.css'
const Employees = () => {

  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState('All');


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
          <button>Add EMP</button>
        </div>

        <div className="row2-sort-header">
          <div className="bread-crum">
            <h2 className={selectedBreadcrumb === 'All' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('All')}>All</h2>
            <h2 className={selectedBreadcrumb === 'Online' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Online')}>Online</h2>
            <h2 className={selectedBreadcrumb === 'Offline' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Offline')}>Offline</h2>
          </div>
        </div>

        <div className="row3-employee-card-set">
          <div className="emp-card"></div>
        </div>
      </div>
    </div>

  )
}

export default Employees
