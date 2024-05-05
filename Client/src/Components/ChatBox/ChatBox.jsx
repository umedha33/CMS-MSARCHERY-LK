import React from 'react'
import './ChatBox.css'
import { ChatState } from '../../context/ChatProvider'
import SingleChat from '../SingleChat/SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {

    // const { selectedChat } = ChatState();

    return (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    )
}

export default ChatBox
