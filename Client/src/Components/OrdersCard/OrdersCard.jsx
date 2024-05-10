import React, { useEffect, useState } from 'react'
import './OrdersCard.css'
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const OrdersCard = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { user } = ChatState();

    const fetchContent = async () => {
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.get('/api/mysub/fetchOrder', config);

            if (data) {
                console.log('All orders data:', data.order);
                setOrders(data.order);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };

    useEffect(() => {
        fetchContent();
    }, [])


    return (
        <div className='contnt-card-container'>
            <div className="crd-hdr-contn">
                <h2>Orders List</h2>
            </div>
            <div className="cntnt-itms-panl">
                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    orders.map(order => (
                        <div className="order-item" key={order._id}>
                            <div className="order-detail">
                                <div className="ordid-wdth">
                                    <a href={order.customerPic.url} target="_blank" rel="noopener noreferrer">
                                        <img src={order.customerPic.url} alt={order.customerPic.name} className="order-image" />
                                    </a>
                                    <h3>Order ID: {order.orderId}</h3>
                                </div>
                                <div className="ordrdtls-hight">
                                    <div className="order-info">
                                        <p>Name: {order.custName}</p>
                                        <p>Email: {order.custEmail}</p>
                                        <p>Phone: {order.custPhone}</p>
                                        <p>Address: {order.custAddress}</p>
                                    </div>
                                    <div className="order-info">
                                        <p>Order Amount: ${order.orderAmount}</p>
                                        <p>Products: {order.orderProducts}</p>
                                        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                        <a href={order.customerLicense.url} target="_blank" rel="noopener noreferrer" title="View License">
                                            <i className="fa-solid fa-file-code"></i> View License
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )


}

export default OrdersCard
