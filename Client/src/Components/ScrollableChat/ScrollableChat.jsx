import React from 'react'
import './ScrollableChat.css'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../../config/ChatLogics'
import { ChatState } from '../../context/ChatProvider'

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState()

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div className='chat-rndrs'>
                    <div className="chat-threads">
                        {m.sender._id === user._id ? (
                            <div className="user-side">
                                <p id='user-msg'>{m.content}</p>
                            </div>
                        ) : (
                            <div className="sender-side">
                                <div className='img-cht-rnd'>
                                    {(isSameSender(messages, m, i, user._id)
                                        || isLastMessage(messages, i, user._id)
                                    ) && (<img src={user.pic} alt={user.name} id='chat-usr-ico' />)}
                                </div>
                                <p id='sender-msg'>{m.content}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat
