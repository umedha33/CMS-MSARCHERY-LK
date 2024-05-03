import React from 'react'
import './ChatBox.css'

const ChatBox = () => {
    return (
        <div className="messenger-container">
            <div className="msg-box">
                <div className="msg-head">
                    <h2>Nihal</h2>
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <div className="msg-body">
                    <div className="chat-threads">
                        <div className="sender-side">
                            <p id='sender-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
                        </div>
                        <div className="user-side">
                            <p id='user-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
                            <p id='user-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
                        </div>
                        <div className="sender-side">
                            <p id='sender-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta adipisicing elit. Perferendis officia ad dicta error</p>
                        </div>
                        <div className="user-side">
                            <p id='user-msg'>Perferendis officia ad dicta error corrupti.</p>
                        </div>
                        <div className="sender-side">
                            <p id='sender-msg'>consectetur adipisicing elit. Perferendis officia ad dicta error corrupti dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error</p>
                        </div>
                    </div>
                    <div className="text-sender">
                        <input type="text" name="message-txt" id="message-txt" placeholder='Enter a message' />
                        <i class="fa-solid fa-circle-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox
