import React, { useEffect, useState } from 'react'
import './Employees.css'
import empDummy from '../Assets/emp-dummy.js'
import { ChatState } from '../../context/ChatProvider.js';
import axios from 'axios';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";
var socket;

const Employees = ({ activeNavElem }) => {

  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState('All');
  const [allEmps, setAllEmps] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = ChatState();

  const filteredData = allEmps && Array.isArray(allEmps) ? allEmps.filter(emp => {
    if (selectedBreadcrumb === 'All') return true;
    if (selectedBreadcrumb === 'Online') return emp.userActive === true;
    if (selectedBreadcrumb === 'Offline') return emp.userActive === false;
    return false;
  }) : [];

  const assignClick = (item) => {
    activeNavElem(item);
  };

  const fetchAllEmps = async () => {
    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/user/fetchAllEmp", config);
      setAllEmps(data);
      setLoading(false);
      // console.log(`all emps: `, data);
    } catch (error) {
      window.alert("Error occured!")
    }
  };

  useEffect(() => {
    fetchAllEmps();
  }, [])

  useEffect(() => {
    if (user && user._id) {
      socket = io(ENDPOINT);
      socket.emit('setup', user);
      socket.on('connected', () => {
        console.log('Socket connected');
      });
      socket.on('user status update', (updatedUser) => {
        // console.log(`updateduser: `, updatedUser);
        setAllEmps(prevAllEmps =>
          prevAllEmps.map(emp =>
            emp._id === updatedUser.user._id ? { ...emp, userActive: updatedUser.user.userActive } : emp
          )
        );
      });
    } else {
      console.error('missing _id field');
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  return (
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
        {loading ? (
          <>
            <div className="lodn-cont">
              <div className="loading-spinner"></div>
            </div>
          </>
        ) : (
          <>
            <div className="emp-cards">
              {filteredData.map(emp => (
                <div key={emp._id} className={`empCard ${emp.userActive ? 'online' : ''}`}>
                  <img src={emp.pic} alt="dp-image" />
                  <div className="info-set">
                    <h3>Post: <span className="emp-tag">{emp.role}</span></h3>
                    <h3>Name: <span className="emp-tag">{emp.name}</span></h3>
                    <h3 style={{ textTransform: 'uppercase' }}>ID: <span className="emp-tag">{emp._id.slice(-4)}</span></h3>
                    <h3>Status: <span className="emp-tag">{`${emp.userActive ? 'Online' : 'Offline'}`}</span></h3>
                    <h3>Contact: <span className="emp-tag">{emp.phone}</span></h3>
                    <h3>Email: <span className="emp-tag">{emp.email}</span></h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}


      </div>
    </div>
  )
}

export default Employees
