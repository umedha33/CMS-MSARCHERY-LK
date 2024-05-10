import React from 'react'

const HelpCenter = () => {
    return (
        <div className='meet-container'>
            <div className="topset">
                <div className="row1-lobby-header">
                    <h1>HELP CENTER</h1>
                </div>

                <div className="row2-divider-meet">
                    <h2>.</h2>
                </div>
            </div>

            <iframe
                src="/HelpCenter/HelpCenter.html"
                title="Conference Room"
                width="100%"
                height="84%"
                className='iframe'
            />
        </div>
    )
}

export default HelpCenter
