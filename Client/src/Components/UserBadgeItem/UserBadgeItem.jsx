import React from 'react'
import './UserBadgeItem.css'

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <div className='userbadge-container'>
            <h1>{user.name}</h1>
            <i className="fa-solid fa-xmark usr-bdg-cls" onClick={() => handleFunction()}></i>
        </div>
    )
}

export default UserBadgeItem
