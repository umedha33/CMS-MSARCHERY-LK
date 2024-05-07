import React from 'react'
import './Meet.css'
import Lobby from './../Lobby/Lobby';

const Meet = () => {
  return (
    <div className='meet-container'>
      <div className="topset">
        <div className="row1-lobby-header">
          <h1>MS MEET</h1>
          {/* <div className="lob-prof">
            <h2>Create Room</h2>
          </div> */}
        </div>

        <div className="row2-divider-meet">
          <h2>.</h2>
        </div>
      </div>

      <iframe
        src="/ConferenceRoom/lobby.html"
        title="Conference Room"
        width="100%"
        height="83.5%"
        className='iframe'
      />
    </div>
  )
}

export default Meet
