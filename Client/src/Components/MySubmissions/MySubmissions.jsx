import React, { useState } from 'react'
import './MySubmissions.css'
import OrderSubmit from '../OrderSubmit/OrderSubmit';
import { ChatState } from '../../context/ChatProvider';
import ContentSubmit from '../ContentSubmit/ContentSubmit';

const MySubmissions = () => {

    const { user } = ChatState();

    return (
        <div className='mysub-container'>
            <div className="topset">
                <div className="row1-mysub-header">
                    <h1>MY SUBMISSIONS</h1>
                </div>
                <div className="row2-divider-mysub">
                    <h2>.</h2>
                </div>
            </div>

            {user && user.role === "E-Com-Manager" ? (<OrderSubmit />) : (<></>)}
            {/* {user && user.role === "E-Com-Manager" ? (<ContentSubmit />) : (<></>)} */}

        </div>
    );
}

export default MySubmissions;
