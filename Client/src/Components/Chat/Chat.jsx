import React, { useEffect, useState } from 'react'
import './Chat.css'
import dpImg from '../Assets/pers2.jpg'
import { ChatState } from '../../context/ChatProvider'
import ChatList from '../ChatList/ChatList'
import ChatBox from '../ChatBox/ChatBox'
import ProfileModel from '../ProfileModel/ProfileModel'

const Chat = () => {
  const { user } = ChatState();

  return (
    <div className='chatapp-container'>
      <div className="row1-chatapp-header">
        <h1>MS CHAT</h1>
        <div className="noti-prof">
          <i class="fa-solid fa-bell"></i>
          <ProfileModel user={user}>
            <img src={user.pic} alt="dp" className='header-img' />
          </ProfileModel>
        </div>
      </div>

      <div className="row2-divider">
        <h2>.</h2>
      </div>

      {user ? (
        <>
          <div className="chatting-container">
            <ChatList />
            <ChatBox />
          </div>
        </>
      ) : (
        <>
          <h3>Error...</h3>
        </>
      )}

    </div>
  )
}

export default Chat
