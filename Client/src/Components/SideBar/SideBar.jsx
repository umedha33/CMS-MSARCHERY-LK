import React, { useState, useEffect } from 'react';
import './SideBar.css';
import mslogo from '../Assets/msarchery-logo-new-tra.png';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:4000";
var socket;

const SideBar = ({ activeNavElem }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeNavItem, setActiveNavItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dashName, setDashName] = useState('dashboard');
    const [socketConnected, setSocketConnected] = useState(false);

    const navigate = useNavigate();
    const { user } = ChatState();

    useEffect(() => {
        if (user && user._id) {
            socket = io(ENDPOINT);
            // socket.emit('setup', user);
            // socket.on('connection', () => {
            //     console.log('Socket connected');
            //     setSocketConnected(true);
            // });
        } else {
            console.error('User data is not defined or missing _id field');
        }
    }, [user]);

    const sendStatus = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put('/api/user/updateStatus', {
                userStatus: false,
            }, config);

            console.log(`data: `, data);
            socket.emit("user active", data);
        } catch (error) {
            // window.alert('Error occurred');
        }
    };

    useEffect(() => {
        const storedNavItem = sessionStorage.getItem('activeNavItem');
        const storedSidebarState = sessionStorage.getItem('isSidebarOpen');

        if (storedNavItem) {
            setActiveNavItem(storedNavItem);
        }

        if (storedSidebarState === 'true' || storedSidebarState === 'false') {
            setIsSidebarOpen(storedSidebarState === 'true');
        }

        setIsLoading(false);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
        sessionStorage.setItem('isSidebarOpen', !isSidebarOpen);
    };

    const handleNavItemClick = (item) => {
        setActiveNavItem(item);
        activeNavElem(item);
        sessionStorage.setItem('activeNavItem', item);
    };

    const logoutHandler = () => {
        sendStatus();
        localStorage.removeItem('userInfo');
        navigate("/");
    }

    return (
        <div>
            <div className={`side-section ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <div className="side-bar">
                    <div className="header-elements">
                        <img id='ms-logo' src={mslogo} alt="ms-logo" />
                        <h1 id='head-lbl'>{user ? `${user.role} dashboard` : 'Dashboard'}</h1>
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
                        <button id='logout-btn' onClick={() => { logoutHandler() }}><i className="fa-solid fa-right-from-bracket"></i> LOGOUT</button>
                    </div>
                </div>
                <i id='tog-close' className={`fa-solid fa-angle-${isSidebarOpen ? 'left' : 'right'}`} onClick={toggleSidebar}></i>
            </div>
        </div>
    )
}

export default SideBar;
