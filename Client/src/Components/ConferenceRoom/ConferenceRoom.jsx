import React from 'react'
import './ConferenceRoom.css'

const ConferenceRoom = () => {
    return (
        <div id="room__container">
            <div id="members__container">
                <div id="members__header">
                    <p>Participants</p>
                    <strong id="members__count">0</strong>
                </div>

                <div id="member__list"></div>
            </div>

            <div id="stream__container">
                <div id="stream__box"></div>
                <div id="streams__container"></div>

                <div className="stream__actions">
                    <button id="camera-btn" className="active">Camera Icon</button>
                    <button id="mic-btn" className="active">Mic Icon</button>
                    <button id="screen-btn">Screen Icon</button>
                    <button id="leave-btn" style={{ backgroundColor: '#FF5050' }}>Leave Icon</button>
                </div>

                <button id="join-btn">Join Stream</button>
            </div>

            <div id="messages__container">
                <div id="messages"></div>
                <form id="message__form">
                    <input type="text" name="message" placeholder="Send a message...." />
                </form>
            </div>
        </div>
    )
}

export default ConferenceRoom
