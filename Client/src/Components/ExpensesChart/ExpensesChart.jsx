import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import './ExpensesChart.css';

const ExpensesChart = () => {
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const { user } = ChatState();

    const fetchExpenses = async () => {
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get('/api/mysub/fetchExpense', config);

            if (data) {
                setExpenses(data.expense);
                console.log('All expenses data:', data);
            }
        } catch (error) {
            console.error('Error fetching the expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const chartData = {
        datasets: [
            {
                label: 'Expenses',
                data: expenses.map(expense => ({
                    x: new Date(expense.expDate),
                    y: expense.expAmount,
                })),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 0.6)',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount (LKR)',
                },
            },
        },
    };

    return (
        <div className='expenses-chart-container'>
            {loading ? <p>Loading...</p> : <Line data={chartData} options={options} />}
        </div>
    );
};

export default ExpensesChart;
