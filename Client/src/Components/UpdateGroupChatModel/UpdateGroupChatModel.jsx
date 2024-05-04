import React, { useState } from 'react'
import './UpdateGroupChatModel.css'
import { ChatState } from '../../context/ChatProvider';
import UserBadgeItem from '../UserBadgeItem/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserListItem/UserListItem';

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState()

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            window.alert("Only admin can remove users!")
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(`/api/chat/groupremove`, {
                chatId: selectedChat._id,
                userId: user1._id,
            }, config
            );

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);

        } catch (error) {
            window.alert("Error occured!")
            setLoading(false);
        }
        setGroupChatName("");
    }

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            window.alert("User exists!")
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            window.alert("Only admin can add users!")
            return;
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put('/api/chat/groupadd', {
                chatId: selectedChat._id,
                userId: user1._id,
            }, config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            window.alert("Error occured!")
            setLoading(false);
        }
    }

    const handleRename = async () => {
        if (!groupChatName) {
            return;
        }
        try {
            setRenameLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName,
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            window.alert("Error occured!")
            setRenameLoading(false);
        }

        setGroupChatName('');

    }

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setSearchResult(data);
            // console.log(data);
            setLoading(false)

        } catch (error) {
            window.alert("Error occured!");
        }

    }


    return (
        <div>
            <i class="fa-solid fa-circle-info" onClick={() => { setIsOpen(true) }}></i>
            {isOpen ? (
                <div className="upd-container">
                    <div className="upd-card">
                        <h1 id='prof-name'>{selectedChat.chatName}</h1>
                        <div className="usrs-lst-body">
                            {selectedChat.users.map(u => (
                                <UserBadgeItem key={user._id}
                                    user={u}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </div>
                        <div className='grpch-rename-inps'>
                            <input type="text"
                                id="grprename-name-inp"
                                placeholder='Rename Group'
                                onChange={(e) => setGroupChatName(e.target.value)} />
                            <button id='updt-renam-btn' onClick={() => { handleRename() }}>UPDATE</button>
                        </div>
                        <input type="text"
                            id="grprename-search-inp"
                            placeholder='Search Users'
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <div className="render-reslts">
                            <>
                                {loading ? (
                                    <div className="lodn-cont-grpch">
                                        <div className="loading-spinner"></div>
                                    </div>
                                ) : (
                                    <div className='usr-list-grprn'>
                                        {searchResult?.map((user) => (
                                            <div className="srch-usr-res">
                                                <UserListItem
                                                    key={user._id}
                                                    user={user}
                                                    handleFunction={() => handleAddUser(user)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        </div>
                        <div className='btm-btn-grpch-rename'>
                            <button onClick={() => { handleRemove(user) }} id='lev-btn-grpch-rn'>LEAVE</button>
                            <button onClick={() => { setIsOpen(false) }} id='cls-btn-grpch-rn'>CLOSE</button>
                        </div>
                    </div>
                </div>

            ) : (
                <></>
            )}
        </div>
    )
}

export default UpdateGroupChatModel
