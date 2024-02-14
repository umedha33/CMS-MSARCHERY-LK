import React from 'react'
import './CSS/AdminDash.css'
import SideBar from '../Components/SideBar/SideBar'

const AdminDash = () => {
    return (
        <div className='admin'>
            <div className="nav-pane">
                <SideBar />
            </div>
            <div className="dash-pane">
                {/* <h1>this is admin</h1> */}
            </div>
        </div>
    )
}

export default AdminDash

