import React from 'react'
import './Chat.css'
import dpImg from '../Assets/pers2.jpg'

const Chat = () => {
  return (
    <div className='chatapp-container'>
      <div className="row1-chatapp-header">
        <h1>MS CHAT</h1>
        <div className="noti-prof">
          <i class="fa-solid fa-bell"></i>
          <img src={dpImg} alt="dp" />
        </div>
      </div>

      <div className="row2-divider">
        <h2>.</h2>
      </div>

      <div className="chatting-container">
        <div className="chatlist-container">
          <div className="searchbar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" name="search" id="search" placeholder='Search User' />
            <i class="fa-solid fa-plus"></i>
          </div>
          <div className="chatrender">
            <div className="chatlist-card">
              <h2>Sumedha</h2>
              <p>Hey did you get the contact?</p>
            </div>
            <div className="chatlist-card">
              <h2>Akash</h2>
              <p>I have the ID</p>
            </div>
            <div className="grplist-card">
              <h2>Logistics Group</h2>
              <p><span>Lalith: </span>We'll send it...</p>
            </div>
            <div className="chatlist-card">
              <h2>Nihal</h2>
              <p>Ask for upcoming events</p>
            </div>
          </div>
        </div>
        <div className="messenger-container">
          {/* <div className="default-cont">
            <h2>Select a chat to message...</h2>
          </div> */}

          <div className="msg-box">
            <div className="msg-head">
              <h2>Nihal</h2>
              <i class="fa-solid fa-circle-info"></i>
            </div>
            <div className="msg-body">
              {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis fuga deserunt quasi aut sapiente inventore quod! Sequi tempore quae hic aspernatur. Aut id officiis illo natus exercitationem, omnis facere delectus!</p> */}
              <div className="text-sender">
                <input type="text" name="message-txt" id="message-txt" placeholder='Enter a message' />
                <i class="fa-solid fa-circle-arrow-right"></i>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
