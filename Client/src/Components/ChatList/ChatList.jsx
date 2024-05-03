import React, { useState } from 'react'
import './ChatList.css'
import { ChatState } from '../../context/ChatProvider';

const ChatList = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);



    return (
        <div className="chatlist-container">
            <div className="searchbar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="search" id="search" placeholder='Search User' onClick={() => { setIsOpen(true) }} />
                {isOpen ? (
                    <i class="fa-solid fa-xmark fax" onClick={() => { setIsOpen(false) }}></i>
                ) : (
                    <i class="fa-solid fa-plus"></i>
                )}
            </div>
            {isOpen ? (
                <div className='search-cht-container'></div>
            ) : (
                <div className="chatrender">
                    <div className="chatlist-card">
                        <h2>Umedha</h2>
                        <p>Hey did you get the contact?</p>
                    </div>

                    <div className="grplist-card">
                        <h2>Logistics Group</h2>
                        <p><span>Lalith: </span>We'll send it...</p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ChatList
