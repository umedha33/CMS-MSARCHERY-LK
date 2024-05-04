import React, { useEffect, useState } from 'react'
import './ChatList.css'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserListItem/UserListItem';
import { getSender } from '../../config/ChatLogics';
import GroupChatModel from '../GroupChatModel/GroupChatModel';

const ChatList = ({ fetchAgain }) => {

    const [loggedUser, setLoggedUser] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const handleSearch = async () => {
        // if (!search) {
        //     window.alert("Enter Name or Email!");
        // }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            window.alert("Error occured!");
        }
    }

    const searchBack = () => {
        setIsOpen(false);
        setSearch("");
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post('/api/chat', { userId }, config);
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            setIsOpen(false);

        } catch (error) {
            window.alert("Error Fetching Chat")
        }
    }

    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            window.alert("Error occured!")
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
        fetchChats();
    }, [fetchAgain])

    return (
        <div className="chatlist-container">
            <div className="searchbar">
                <i class="fa-solid fa-magnifying-glass" onClick={() => { handleSearch() }}></i>
                <input type="text"
                    id="search"
                    placeholder='Search User'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => { setIsOpen(true) }} />
                {isOpen ? (
                    <i class="fa-solid fa-xmark fax" onClick={() => { searchBack() }}></i>
                ) : (//GROUP BUTTON
                    <GroupChatModel>
                        <i class="fa-solid fa-plus"></i>
                    </GroupChatModel>
                )}
            </div>
            {isOpen ? (
                <div className='search-cht-container'>
                    {loading ? (
                        <div className="lodn-cont">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
                        <div className="search-results">
                            {searchResult?.map(user => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="chatrender">
                    {chats ? (
                        <>
                            {chats.map((chat) => (
                                <div onClick={() => setSelectedChat(chat)}
                                    className={!chat.isGroupChat ? 'new-chtlst' : 'new-grplst'}
                                    id={selectedChat === chat ? 'chat-slcted' : ''}>
                                    {!chat.isGroupChat ? (
                                        <>
                                            <h3>{getSender(loggedUser, chat.users)}</h3>
                                            <p>dhodwhdhdwd</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3>{chat.chatName}</h3>
                                            <p>ifubiuwfbiubwf</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="lodn-cont">
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default ChatList
