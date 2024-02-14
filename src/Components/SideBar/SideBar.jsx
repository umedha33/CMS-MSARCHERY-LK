import React from 'react'
import './SideBar.css'

const SideBar = () => {
    return (
        <div>
            <div className="side-bar">
                <div className="header-elements">
                    <h1 id='head-lbl'>Admin Dashboard</h1>
                    <hr />
                </div>
                <div className="nav-elements">

                    <h2 className='nav-lbl'><i class="fa-solid fa-list-check"></i>Tasks</h2>
                    <h2 className='nav-lbl'><i class="fa-solid fa-users"></i>Employees</h2>
                    <h2 className='nav-lbl'><i class="fa-solid fa-calendar-days"></i>Schedules</h2>
                    <h2 className='nav-lbl'><i class="fa-solid fa-comments"></i>Chat</h2>
                    <h2 className='nav-lbl'><i class="fa-solid fa-headset"></i>Meet</h2>
                    <h2 className='nav-lbl'><i class="fa-solid fa-chart-line"></i>Sales</h2>
                </div>
                <div className="foot-elements">
                    <h1>Settings</h1>
                    <button>LOGOUT</button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
