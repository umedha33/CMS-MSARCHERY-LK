import React from 'react'
import './CSS/AdminDash.css'
import SideBar from '../Components/SideBar/SideBar'
import Tasks from '../Components/Tasks/Tasks'

const AdminDash = () => {
    return (
        <div className='admin'>
            <div className="nav-pane">
                <SideBar />
            </div>
            <div className="dash-pane">
                <Tasks/>
            </div>
        </div>
    )
}

export default AdminDash

