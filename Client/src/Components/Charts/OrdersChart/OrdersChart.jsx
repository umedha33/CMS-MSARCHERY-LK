import React, { useEffect, useState } from 'react';
import './OrdersChart.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { ChatState } from '../../../context/ChatProvider';

const OrdersChart = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { user } = ChatState();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [mostExpensiveProduct, setMostExpensiveProduct] = useState('');
    const [leastExpensiveProduct, setLeastExpensiveProduct] = useState('');
    const [mostSoldProduct, setMostSoldProduct] = useState('');
    const [totalOrders, setTotalOrders] = useState(0);
    const [averageOrderAmount, setAverageOrderAmount] = useState(0);
    const [totalUniqueProducts, setTotalUniqueProducts] = useState(0);
    const [csvUrl, setCsvUrl] = useState(null); // State to store the CSV URL

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
            }
        } catch (error) {
            console.error('Error fetching the orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        calculateMonthlyIncome();
        findMostAndLeastExpensiveProducts();
        findMostSoldProduct();
        calculateTotalOrders();
        calculateAverageOrderAmount();
        calculateTotalUniqueProducts();
    }, [currentMonth, orders]);

    useEffect(() => {
        if (mostSoldProduct) {
            renderCircularChart();
        }
    }, [mostSoldProduct]);

    useEffect(() => {
        generateCSV(orders); // Generate CSV when orders update
    }, [orders]);

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

    const findMostSoldProduct = () => {
        if (orders.length === 0) return;

        const productCounts = {};
        orders.forEach(order => {
            const product = order.orderProducts;
            productCounts[product] = (productCounts[product] || 0) + 1;
        });

        const mostSold = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b);
        setMostSoldProduct(mostSold);
    };

    const calculateTotalOrders = () => {
        setTotalOrders(orders.length);
    };

    const calculateAverageOrderAmount = () => {
        const totalAmount = orders.reduce((acc, order) => acc + order.orderAmount, 0);
        const averageAmount = totalAmount / orders.length || 0;
        setAverageOrderAmount(averageAmount.toFixed(2));
    };

    const calculateTotalUniqueProducts = () => {
        const uniqueProducts = new Set(orders.map(order => order.orderProducts));
        setTotalUniqueProducts(uniqueProducts.size);
    };

    const generateCSV = (ordersData) => {
        let csvContent = "";
        csvContent += "Order Date,Order Amount,Order Products\n"; // Column headers
        ordersData.forEach(order => {
            csvContent += `${order.orderDate},${order.orderAmount},${order.orderProducts}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        setCsvUrl(URL.createObjectURL(blob));
    };

    const renderCircularChart = () => {
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [mostSoldProduct, 'Other Products'],
                    datasets: [{
                        label: 'Most Sold Product',
                        data: [orders.filter(order => order.orderProducts === mostSoldProduct).length, orders.length - orders.filter(order => order.orderProducts === mostSoldProduct).length],
                        backgroundColor: [
                            'rgba(22, 169, 234, 0.53)',
                            'rgba(22, 169, 92, 0.53)',
                        ],
                        borderColor: [
                            'rgba(22, 169, 234, 0.53)',
                            'rgba(22, 169, 92, 0.53)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                },
            });
        }
    };

    const changeMonth = (delta) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + delta));
        setCurrentMonth(newMonth);
    };

    return (
        <div className='orders-rprts-container'>
            <div className="income-info">
                <div className="month-navigator">
                    <button onClick={() => changeMonth(-1)}>Prev</button>
                    <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button disabled={currentMonth >= new Date()} onClick={() => changeMonth(1)}>Next</button>
                </div>
                <div className="ords-ps-txt">
                    <p>Total Income: {monthlyIncome} LKR</p>
                    {/* <p>Most Expensive Product: {mostExpensiveProduct}</p> */}
                    {/* <p>Least Expensive Product: {leastExpensiveProduct}</p> */}
                    <p>Most Sold Product: {mostSoldProduct}</p>
                    <p>Total Orders: {totalOrders}</p>
                    <p>Average Order Amount: {averageOrderAmount} LKR</p>
                    <p>Total Unique Products Sold: {totalUniqueProducts}</p>
                    {csvUrl && <a id='anch-ords-csv' href={csvUrl} download="Orders.csv">Download Orders CSV <i className="fa-solid fa-file-csv"></i></a>}
                </div>
            </div>
            <div className="chart-container">
                <canvas id="myChart"></canvas>
            </div>
        </div>
    );
};

export default OrdersChart;
