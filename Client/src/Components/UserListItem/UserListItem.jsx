import React from 'react'
import './UserListItem.css'
import { ChatState } from '../../context/ChatProvider';

const UserListItem = ({ user, handleFunction }) => {
    // const { user } = ChatState();

    return (
        <div className='search-res-container'>
            <div className="search-res-chat" onClick={() => handleFunction()}>
                <img src={user.pic} alt="user-thumb" id='srch-us-thumb' />
                <div className="srch-res-inf">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default UserListItem
