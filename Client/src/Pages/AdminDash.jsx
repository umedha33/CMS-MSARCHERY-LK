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

const AdminDash = () => {
    const [showComp, setShowComp] = useState(null);
    const location = useLocation();

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