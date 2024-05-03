import React, { useState } from 'react'
import './ProfileModel.css'
import { ChatState } from '../../context/ChatProvider';

const ProfileModel = ({ user, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='profile-model-container'>
            {children ? (
                <div onClick={() => { setIsOpen(true) }}>{children}</div>
            ) : (
                <div><i className="fa-solid fa-user"></i></div>
            )}

            {isOpen ? (
                <div className="prof-container">
                    <div className="prof-card">
                        <h1 id='prof-name'>{user.name}</h1>
                        <img src={user.pic} alt="profile image" className='popup-dp' />
                        <div className='prof-inf'>
                            <h1 id='prof-email'>Email: {user.email}</h1>
                            <h1 id='prof-email'>Role: {user.role}</h1>
                            <h1 id='prof-email'>Phone: {user.phone}</h1>
                        </div>
                        <div className='btm-btn'>
                            <button onClick={() => { setIsOpen(false) }} id='cls-btn-prof'>CLOSE</button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default ProfileModel
