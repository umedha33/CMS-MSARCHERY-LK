import React, { useState } from 'react'
import './MySubmissions.css'
import { ChatState } from '../../context/ChatProvider';
import OrderSubmit from '../OrderSubmit/OrderSubmit';
import ContentSubmit from '../ContentSubmit/ContentSubmit';
import ProofSubmit from '../ProofSubmit/ProofSubmit';
import ExpensesSubmit from '../ExpensesSubmit/ExpensesSubmit';

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

            {/* {user && user.role === "E-Com-Manager" ? (<OrderSubmit />) : (<></>)} */}
            {/* {user && user.role === "E-Com-Manager" ? (<ContentSubmit />) : (<></>)} */}
            {/* {user && user.role === "E-Com-Manager" ? (<ProofSubmit />) : (<></>)} */}
            {/* {user && user.role === "E-Com-Manager" ? (<ExpensesSubmit />) : (<></>)} */}

        </div>
    );
}

export default MySubmissions;
