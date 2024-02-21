import React, { useState } from 'react';
import './CSS/AdminDash.css'
import SideBar from '../Components/SideBar/SideBar'
import Tasks from '../Components/Tasks/Tasks'
import Employees from './../Components/Employees/Employees';
import Schedules from './../Components/Schedules/Schedules';
import Chat from './../Components/Chat/Chat';
import Meet from './../Components/Meet/Meet';
import Sales from './../Components/Sales/Sales';
import Settings from '../Components/Settings/Settings';
import HelpCenter from '../Components/HelpCenter/HelpCenter';

const AdminDash = () => {

    const [showComp, setShowComp] = useState('Tasks');

    const activeNavElem = (element) => {
        setShowComp(element);
    };

    let componentToRender;

    switch (showComp) {
        case "Tasks":
            componentToRender = <Tasks />;
            break;
        case "Employees":
            componentToRender = <Employees />;
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
        default:
            componentToRender = null;
            break;
    }

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

export default AdminDash

