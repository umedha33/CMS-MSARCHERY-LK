import React, { useState } from 'react'
import './MyHub.css'
import { ChatState } from '../../context/ChatProvider';
import ContentCard from '../ContentCard/ContentCard';
import ProofsCard from '../ProofsCard/ProofsCard';
import OrdersCard from '../OrdersCard/OrdersCard';
import CustNoteCard from '../CustNoteCard/CustNoteCard';

const MyHub = () => {
    const { user } = ChatState();

    return (
        <div className='mysub-container'>
            <div className="topset">
                <div className="row1-mysub-header">
                    <h1>MY HUB</h1>
                    <h1 id='usrrl-mysbs'>{user.role}</h1>
                </div>
                <div className="row2-divider-mysub">
                    <h2>.</h2>
                </div>
            </div>

            {/* for ecom manager - content,  proof*/}
            {/* {user && user.role === "E-Com-Manager" ? (
                <div className='myhub-btm-pnl'>
                    <div className="lft-card-comps">
                        <ContentCard />
                    </div>
                    <div className="right-card-comps">
                        <ProofsCard />
                    </div>
                </div>
            ) : (<></>)} */}

            {/* for accountant - orders,  proof*/}
            {/* {user && user.role === "E-Com-Manager" ? (
                <div className='myhub-btm-pnl'>
                    <div className="lft-card-comps">
                        <OrdersCard />
                    </div>
                    <div className="right-card-comps">
                        <ProofsCard />
                    </div>
                </div>
            ) : (<></>)} */}

            {/* for sales and marketing - content*/}
            {/* {user && user.role === "E-Com-Manager" ? (
                <div className='myhub-btm-pnl'>
                    <ContentCard />
                </div>
            ) : (<></>)} */}

            {/* for customer care - customer notes*/}
            {user && user.role === "Customer-Care" ? (
                <div className='myhub-btm-pnl'>
                    <CustNoteCard />
                </div>
            ) : (<></>)}

            {/* for logistcs and prep - orders*/}
            {/* {user && user.role === "E-Com-Manager" ? (
                <div className='myhub-btm-pnl'>
                    <OrdersCard />
                </div>
            ) : (<></>)} */}

            {/* for manager - orders, customer notes*/}
            {/* {user && user.role === "E-Com-Manager" ? (
                <div className='myhub-btm-pnl'>
                    <div className="verticlsss">
                        <CustNoteCard />
                        <OrdersCard />
                    </div>
                </div>
            ) : (<></>)} */}

            {/* for admin - all*/}
            {user && user.role === "E-Com-Manager" ? (
                <div className='myhub-btm-pnl'>
                    <div className="verticlsss">
                        <CustNoteCard />
                        <OrdersCard />
                        <ProofsCard />
                        <ContentCard />
                        {/* <Expenses /> */}
                        {/* <Salesrepos /> */}
                    </div>
                </div>
            ) : (<></>)}


        </div >
    );
}

export default MyHub
