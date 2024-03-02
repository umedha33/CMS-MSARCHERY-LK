import React, { useState } from 'react'
import './SideBar.css'
import mslogo from '../Assets/msarchery-logo-new-tra.png'

const SideBar = ({ activeNavElem }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeNavItem, setActiveNavItem] = useState('Tasks');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavItemClick = (item) => {
        setActiveNavItem(item);
        activeNavElem(item);
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
                        <h2 className={`nav-lbl ${activeNavItem === 'Tasks' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Tasks'); }}>
                            <i className="fa-solid fa-list-check"></i>Tasks
                        </h2>
                        <h2 className={`nav-lbl ${activeNavItem === 'Employees' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Employees'); }}>
                            <i className="fa-solid fa-users"></i>Employees
                        </h2>
                        <h2 className={`nav-lbl ${activeNavItem === 'Schedules' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Schedules'); }}>
                            <i className="fa-solid fa-calendar-days"></i>Schedules
                        </h2>
                        <h2 className={`nav-lbl ${activeNavItem === 'Chat' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Chat'); }}>
                            <i className="fa-solid fa-comments"></i>Chat
                        </h2>
                        <h2 className={`nav-lbl ${activeNavItem === 'Meet' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Meet'); }}>
                            <i className="fa-solid fa-headset"></i>Meet
                        </h2>
                        <h2 className={`nav-lbl ${activeNavItem === 'Sales' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Sales'); }}>
                            <i className="fa-solid fa-chart-line"></i>Sales
                        </h2>
                    </div>
                    <div className={`${isSidebarOpen ? 'foot-elements' : 'foot-elements-min'}`}>
                        <hr id='hr-bottom' />
                        <h2 className={`foot-lbl ${activeNavItem === 'Settings' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Settings'); }}><i className="fa-solid fa-gear"></i>Settings</h2>
                        <h2 className={`foot-lbl ${activeNavItem === 'Help Center' ? 'active' : ''}`} onClick={() => { handleNavItemClick('Help Center'); }}><i className="fa-solid fa-circle-question"></i>Help Center</h2>
                        <button id='logout-btn'><i className="fa-solid fa-right-from-bracket"></i> LOGOUT</button>
                    </div>
                </div>
                <i id='tog-close' className={`fa-solid fa-angle-${isSidebarOpen ? 'left' : 'right'}`} onClick={toggleSidebar}></i>
            </div>
        </div>
    )
}

export default SideBar
