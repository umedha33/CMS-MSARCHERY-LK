import React, { useState, useEffect } from 'react';
import './CSS/AdminDash.css';
import SideBar from '../Components/SideBar/SideBar';
import Tasks from '../Components/Tasks/Tasks';
import Employees from './../Components/Employees/Employees';
import Schedules from './../Components/Schedules/Schedules';
import Chat from './../Components/Chat/Chat';
import Meet from './../Components/Meet/Meet';
import Sales from './../Components/Sales/Sales';
import Settings from '../Components/Settings/Settings';
import HelpCenter from '../Components/HelpCenter/HelpCenter';
import AssignTask from '../Components/AssignTask/AssignTask';
import AssignEmp from '../Components/AssignEmp/AssignEmp';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client'
import { ChatState } from './../context/ChatProvider';
import MySubmissions from './../Components/MySubmissions/MySubmissions';
import MyHub from '../Components/MyHub/MyHub';

const ENDPOINT = "http://localhost:4000";
var socket;

const AdminDash = () => {
    const [showComp, setShowComp] = useState(null);
    const location = useLocation();
    const { user } = ChatState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    useEffect(() => {
        if (user && user._id) {
            socket = io(ENDPOINT);
            socket.emit('setup', user);
            // socket.on('connection', () => {
            //     console.log('Socket connected');
            //     setSocketConnected(true);
            // });
        } else {
            console.error('User data is not defined or missing _id field');
        }
    }, [user]);


    const sendStatus = async (userStatus) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put('/api/user/updateStatus', {
                userStatus: userStatus,
            }, config);

            // console.log(`data: `, data);
            socket.emit("user active", data);
        } catch (error) {
            // window.alert('Error occurred');
        }
    };

    const sendEmpLog = async (startTime, endTime) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post('/api/user/emplogs', {
                startTime: startTime,
                endTime: endTime,
            }, config);

            console.log(`Emp log data: `, data);

        } catch (error) {
            console.error('Error occurred while sending emp log', error);
        }
    };

    useEffect(() => {
        if (endTime && startTime) {
            console.log(`end: `, endTime);
            sendEmpLog(startTime, endTime);
        }
    }, [endTime]);

    useEffect(() => {
        console.log(`start: `, startTime);
    }, [startTime])

    useEffect(() => {
        if (user) {
            sendStatus(true);
            setStartTime(new Date());
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                sendStatus(true);
                setStartTime(new Date());
            } else {
                setEndTime(new Date());
                sendStatus(false);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [user]);

    // ==========================================

    useEffect(() => {
        const storedPage = sessionStorage.getItem('currentPage');
        setShowComp(storedPage || 'Tasks');
    }, [location]);

    const activeNavElem = (element) => {
        setShowComp(element);
        sessionStorage.setItem('currentPage', element);
    };

    let componentToRender;

    switch (showComp) {
        case "Tasks":
            componentToRender = <Tasks activeNavElem={activeNavElem} />;
            break;
        case "Employees":
            componentToRender = <Employees activeNavElem={activeNavElem} />;
            break;
        case "Schedules":
            componentToRender = <Schedules />;
            break;
        case "Chat":
            componentToRender = <Chat />;
            break;
        case "Meet":
            componentToRender = <Meet />;
            break;
        case "Sales":
            componentToRender = <Sales />;
            break;
        case "MySubmissions":
            componentToRender = <MySubmissions />;
            break;
        case "MyHub":
            componentToRender = <MyHub />;
            break;
        case "Settings":
            componentToRender = <Settings />;
            break;
        case "Help Center":
            componentToRender = <HelpCenter />;
            break;
        case "Assign Task":
            componentToRender = <AssignTask activeNavElem={activeNavElem} />;
            break;
        case "Assign EMP":
            componentToRender = <AssignEmp activeNavElem={activeNavElem} />;
            break;
        default:
            componentToRender = null;
            break;
    }

    // if (showComp === null) {
    //     return <div>Loading...</div>; 
    // }

    return (
        <div className='admin'>
            <div className="nav-pane">
                <SideBar activeNavElem={activeNavElem} />
            </div>
            <div className="dash-pane">
                {componentToRender}
            </div>
        </div>
    )
}

export default AdminDash;
