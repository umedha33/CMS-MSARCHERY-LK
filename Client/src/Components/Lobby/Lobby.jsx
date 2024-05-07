import React from 'react'
import './Lobby.css'

const Lobby = () => {
    return (
        <div className='lobby-container'>

            <div className="topset">
                <div className="row1-lobby-header">
                    <h1>MS MEET</h1>
                    <div className="lob-prof">
                        <h2>Create Room</h2>
                    </div>
                </div>

                <div className="row2-divider">
                    <h2>.</h2>
                </div>
            </div>

            {/* <div className="botmset">
                <div className="lby-bdy-container">
                    <div className="lobby-create-container">
                        <h1 id='lb-cnt-hd'>CREATE OR JOIN ROOM</h1>
                        <div className="lob-inp-set">
                            <input type="text" className="name-inp-lobby" placeholder='Enter Name' />
                            <input type="text" className="name-inp-lobby" placeholder='Enter Room ID' />
                        </div>
                        <div className="gotrm-btn">
                            <button id='go-to-rm-btn'>Go To Room ›</button>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default Lobby
