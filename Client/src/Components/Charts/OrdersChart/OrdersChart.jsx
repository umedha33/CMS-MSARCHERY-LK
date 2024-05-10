import React, { useEffect, useState } from 'react';
import './OrdersChart.css';
import axios from 'axios';
import { ChatState } from '../../../context/ChatProvider';

const OrdersChart = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { user } = ChatState();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [mostExpensiveProduct, setMostExpensiveProduct] = useState('');
    const [leastExpensiveProduct, setLeastExpensiveProduct] = useState('');

    const fetchOrder = async () => {
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get('/api/mysub/fetchOrder', config);

            if (data) {
                console.log('All orders data:', data.order);
                setOrders(data.order);
                setLoading(false);
                calculateMonthlyIncome();
                findMostAndLeastExpensiveProducts();
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
            setLoading(false);
        }
    };

    const calculateMonthlyIncome = () => {
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getMonth() === currentMonth.getMonth() && orderDate.getFullYear() === currentMonth.getFullYear();
        });

        const totalIncome = filteredOrders.reduce((acc, order) => acc + order.orderAmount, 0);
        setMonthlyIncome(totalIncome);
    };

    const findMostAndLeastExpensiveProducts = () => {
        if (orders.length === 0) return;

        const sortedOrders = [...orders].sort((a, b) => b.orderAmount - a.orderAmount);
        setMostExpensiveProduct(sortedOrders[0].orderProducts);
        setLeastExpensiveProduct(sortedOrders[sortedOrders.length - 1].orderProducts);
    };

    const changeMonth = (delta) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + delta));
        setCurrentMonth(newMonth);
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        calculateMonthlyIncome();
        findMostAndLeastExpensiveProducts();
    }, [currentMonth, orders]);

    return (
        <div className='orders-rprts-container'>
            <div className="month-navigator">
                <button onClick={() => changeMonth(-1)}>Prev</button>
                <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button disabled={currentMonth >= new Date()} onClick={() => changeMonth(1)}>Next</button>
            </div>
            <div className="income-info">
                <p>Total Income: ${monthlyIncome}</p>
                <p>Most Expensive Product: {mostExpensiveProduct}</p>
                <p>Least Expensive Product: {leastExpensiveProduct}</p>
            </div>
        </div>
    );
};

export default OrdersChart;

