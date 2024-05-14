import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import './ExpensesChart.css';

const ExpensesChart = () => {
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);  // State to store the total expenses
    const [csvUrl, setCsvUrl] = useState(null); // State to store the CSV URL

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

    useEffect(() => {
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.expAmount, 0);
        setTotal(totalExpenses);
        generateCSV(expenses); // Generate CSV whenever expenses update
    }, [expenses]);

    const generateCSV = (expensesData) => {
        let csvContent = "";
        csvContent += "Date,Amount,Title,Description\n"; // Column headers
        expensesData.forEach(expense => {
            csvContent += `${expense.expDate},${expense.expAmount},${expense.expTitle},${expense.expDescription}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        setCsvUrl(URL.createObjectURL(blob));
    };

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
            <div className="exp-infos">
                <h1>{`Expenses for ${new Date().toLocaleString('default', { month: 'long' })}`}</h1>
                <h2>{`Total: ${total.toFixed(2)} LKR`}</h2>
                {csvUrl && <a id='anch-exps-csv' href={csvUrl} download="Expenses.csv">Expenses CSV <i className="fa-solid fa-file-csv"></i></a>}

            </div>
            <div className="exp-chart">
                {loading ? <p>Loading...</p> : <Line data={chartData} options={options} />}
            </div>
        </div>
    );
};

export default ExpensesChart;
