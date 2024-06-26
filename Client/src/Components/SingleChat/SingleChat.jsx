import React, { useEffect, useState } from 'react'
import './SingleChat.css'
import { ChatState } from '../../context/ChatProvider'
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModel from '../ProfileModel/ProfileModel';
import UpdateGroupChatModel from '../UpdateGroupChatModel/UpdateGroupChatModel';
import axios from 'axios';
import ScrollableChat from '../ScrollableChat/ScrollableChat';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) {
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);

            const { data } = await axios.get(`/api/message/${selectedChat._id}`,
                config,
            );
            console.log(`msgs: `, messages);
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);

        } catch (error) {
            window.alert('Error occured');
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user)
        socket.on('connection', () => setSocketConnected(true))
    }, [])

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const sendMessage = async () => {
        if (newMessage) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage('');
                const { data } = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config)

                // console.log(`data: `, data)
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                window.alert('Error occured');
            }
        }
    }


    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }

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
                                    <UpdateGroupChatModel
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                        fetchMessages={fetchMessages}
                                    />
                                </div>
                            )}</h2>
                        </div>
                        <div className="msg-body">
                            {loading ? (
                                <>
                                    <div className="lodn-cont-sngchat">
                                        <div className="loading-spinner-singchat"></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="msgs-container">
                                        {/* {Messages} */}
                                        <ScrollableChat messages={messages} />
                                    </div>
                                    <div className="text-sender">
                                        <input type="text"
                                            name="message-txt"
                                            id="message-txt"
                                            placeholder='Enter a message'
                                            value={newMessage}
                                            onChange={(e) => { typingHandler(e) }}
                                            required />
                                        <i className="fa-solid fa-circle-arrow-right" onClick={() => { sendMessage() }}></i>
                                    </div>
                                </>

                            )}
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
