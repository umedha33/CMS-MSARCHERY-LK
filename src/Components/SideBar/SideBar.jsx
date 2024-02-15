import React, { useState } from 'react'
import './SideBar.css'
import mslogo from '../Assets/msarchery-logo-new-tra.png'

const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const empPost = "Admin Dashboard";

    return (
        <div>
            <div className={`side-section ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <div className="side-bar">
                    <div className="header-elements">
                        <img id='ms-logo' src={mslogo} alt="ms-logo" />
                        <h1 id='head-lbl'>{empPost}</h1>
                    </div>
                    <hr id='hr-top' />
                    <div className={`${isSidebarOpen ? 'nav-elements' : 'nav-elements-min'}`}>
                        <h2 className='nav-lbl'><i class="fa-solid fa-list-check"></i>Tasks</h2>
                        <h2 className='nav-lbl'><i class="fa-solid fa-users"></i>Employees</h2>
                        <h2 className='nav-lbl'><i class="fa-solid fa-calendar-days"></i>Schedules</h2>
                        <h2 className='nav-lbl'><i class="fa-solid fa-comments"></i>Chat</h2>
                        <h2 className='nav-lbl'><i class="fa-solid fa-headset"></i>Meet</h2>
                        <h2 className='nav-lbl'><i class="fa-solid fa-chart-line"></i>Sales</h2>
                    </div>
                    <div className={`${isSidebarOpen ? 'foot-elements' : 'foot-elements-min'}`}>
                        <hr id='hr-bottom' />
                        <h2 className='foot-lbl'><i class="fa-solid fa-gear"></i>Settings</h2>
                        <h2 className='foot-lbl'><i class="fa-solid fa-circle-question"></i>Help Center</h2>
                        <button id='logout-btn'><i class="fa-solid fa-right-from-bracket"></i> LOGOUT</button>
                    </div>
                </div>
                <i id='tog-close' className={`fa-solid fa-angle-${isSidebarOpen ? 'left' : 'right'}`} onClick={toggleSidebar}></i>
            </div>
        </div>
    )
}

export default SideBar
