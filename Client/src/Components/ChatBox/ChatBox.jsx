import React from 'react'
import './ChatBox.css'
import { ChatState } from '../../context/ChatProvider'
import SingleChat from '../SingleChat/SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {

    // const { selectedChat } = ChatState();

    return (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

        // <div className="messenger-container">
        //     <div className="msg-box">
        //         <div className="msg-head">
        //             <h2>Nihal</h2>
        //             <i class="fa-solid fa-circle-info"></i>
        //         </div>
        //         <div className="msg-body">

        //                     {/* <div className="chat-threads">

        //                         <div className="sender-side">
        //                             <p id='sender-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
        //                         </div>
        //                         <div className="user-side">
        //                             <p id='user-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
        //                         </div>

        //                     </div>
        //                     <div className="text-sender">
        //                         <input type="text" name="message-txt" id="message-txt" placeholder='Enter a message' />
        //                         <i class="fa-solid fa-circle-arrow-right"></i>
        //                     </div> */}

        //         </div>
        //     </div>
        // </div>
    )
}

export default ChatBox
