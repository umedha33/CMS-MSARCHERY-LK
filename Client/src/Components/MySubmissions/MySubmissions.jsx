import React, { useState } from 'react'
import './MySubmissions.css'
import { ChatState } from '../../context/ChatProvider';
import OrderSubmit from '../OrderSubmit/OrderSubmit';
import ContentSubmit from '../ContentSubmit/ContentSubmit';
import ProofSubmit from '../ProofSubmit/ProofSubmit';
import ExpensesSubmit from '../ExpensesSubmit/ExpensesSubmit';
import CustNoteSubmit from '../CustNoteSubmit/CustNoteSubmit';
import SalesSubmit from '../SalesSubmit/SalesSubmit';

const MySubmissions = () => {

    const { user } = ChatState();

    return (
        <div className='mysub-container'>
            <div className="topset">
                <div className="row1-mysub-header">
                    <h1>MY SUBMISSIONS</h1>
                    <h1 id='usrrl-mysbs'>{user.role}</h1>
                </div>
                <div className="row2-divider-mysub">
                    <h2>.</h2>
                </div>
            </div>

            {user && user.role === "E-Com-Manager" ? (<OrderSubmit />) : (<></>)}
            {user && user.role === "Content-Creator" ? (<ContentSubmit />) : (<></>)}
            {user && user.role === "Logistics-Preperation" ? (<ProofSubmit />) : (<></>)}
            {user && user.role === "Accountant" ? (<ExpensesSubmit />) : (<></>)}
            {user && user.role === "Customer-Care" ? (<CustNoteSubmit />) : (<></>)}
            {user && user.role === "Sales-Manager" ? (<SalesSubmit />) : (<></>)}

        </div>
    );
}

export default MySubmissions;
