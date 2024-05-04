import React, { useState } from 'react'
import './GroupChatModel.css'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserListItem/UserListItem';
import UserBadgeItem from '../UserBadgeItem/UserBadgeItem';

const GroupChatModel = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();

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

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            window.alert("Give chat name and add users!")
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(`/api/chat/group`, {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map(u => u._id)),
            },
                config
            );

            setChats([data, ...chats]);
            setIsOpen(false);
        } catch (error) {
            window.alert("Error occured!");
        }
    }

    const handleDelete = (deluser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== deluser._id))
    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            window.alert("User already added!")
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    }

    return (
        <div className='grpchat-model-container'>
            {children ? (
                <div onClick={() => { setIsOpen(true) }}>{children}</div>
            ) : (
                <></>
            )}

            {isOpen ? (
                <div className="grp-container">
                    <div className="grp-card">
                        <h1 id='grp-hdr'>Create Group</h1>
                        <div className='grpch-inps'>
                            <input type="text"
                                id="grp-name-inp"
                                placeholder='Enter group name'
                                onChange={(e) => setGroupChatName(e.target.value)} />
                            <input type="text"
                                id="grp-users-inp"
                                placeholder='Search users'
                                onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                        <div className="render-reslts">
                            <>
                                <div className="usr-lst-ary">
                                    {selectedUsers.map(u => (
                                        <UserBadgeItem key={user._id}
                                            user={u}
                                            handleFunction={() => handleDelete(u)}
                                        />
                                    ))}
                                </div>
                                {loading ? (
                                    <div className="lodn-cont-grpch">
                                        <div className="loading-spinner"></div>
                                    </div>
                                ) : (
                                    <div className='usr-list'>
                                        {searchResult?.slice(0, 4).map(user => (
                                            <UserListItem key={user._id}
                                                user={user}
                                                handleFunction={() => handleGroup(user)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        </div>
                        <div className='btm-btn-grpch'>
                            <button onClick={() => { handleSubmit() }} id='cret-btn-grpch'>CREATE</button>
                            <button onClick={() => { setIsOpen(false) }} id='cls-btn-grpch'>CLOSE</button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}


export default GroupChatModel
