import React, { useEffect } from 'react';
import './Settings.css';
import { ChatState } from './../../context/ChatProvider';

const Settings = () => {

    const { user } = ChatState();
    useEffect(() => {
        console.log(user);
    }, [])
    return (
        <div className='mysub-container'>
            <div className="topset">
                <div className="row1-mysub-header">
                    <h1>SETTINGS</h1>
                </div>
                <div className="row2-divider-mysub">
                    <h2>.</h2>
                </div>
            </div>
            <div className="setngs-box">

                <div className="user-info33">
                    <img src={user.pic} alt="User" />
                    <div className="user-details33">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>

                <div className='ht-stngs-inps'>

                    <label htmlFor="firstName">Full Name:</label>
                    <input type="text" value={user.name} name="firstName" />

                    <label htmlFor="email">Email:</label>
                    <input type="email" value={user.email} />

                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" value={user.phone} />

                    <label htmlFor="role">Account Role:</label>
                    <input type="text" value={user.role} />

                </div>

                <div className="buttons-ht">
                    <button className="save">Save</button>
                    <button className="cancel">Cancel</button>
                </div>
            </div>
        </div>

    );
}

export default Settings;
