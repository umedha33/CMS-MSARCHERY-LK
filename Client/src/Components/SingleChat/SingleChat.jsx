import React from 'react'
import './SingleChat.css'
import { ChatState } from '../../context/ChatProvider'
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModel from '../ProfileModel/ProfileModel';
import UpdateGroupChatModel from '../UpdateGroupChatModel/UpdateGroupChatModel';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();
    return (
        <div className='singlechat-container'>
            {selectedChat ? (
                <div className="messenger-container">
                    <div className="msg-box">
                        <div className="msg-head">
                            <h2 id='headr-h2'>{!selectedChat.isGroupChat ? (
                                <div className='convo-header'>
                                    {getSender(user, selectedChat.users)}
                                    <ProfileModel user={getSenderFull(user, selectedChat.users)}>
                                        <i class="fa-solid fa-circle-info"></i>
                                    </ProfileModel>
                                </div>
                            ) : (
                                <div className='convo-header'>
                                    {selectedChat.chatName}
                                    <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                                </div>
                            )}</h2>
                        </div>
                        <div className="msg-body">


                        </div>
                    </div>
                </div>
            ) : (
                <div className='empty-chts'>
                    <h1>Start a chat by clicking on a chat</h1>
                </div>
            )}
        </div>
    )
}

export default SingleChat
