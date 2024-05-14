import React, { useEffect, useState } from 'react';
import './EmpLogChart.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChatState } from '../../../context/ChatProvider';

const EmpLogChart = () => {
    const [loading, setLoading] = useState(false);
    const [emplogs, setEmplogs] = useState([]);
    const { user } = ChatState();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    });
    const [csvUrl, setCsvUrl] = useState(null);

    useEffect(() => {
        fetchEmpLogs();
    }, []);

    useEffect(() => {
        if (emplogs.length) {
            prepareChartData();
            generateCSV();
        }
    }, [emplogs, currentMonth]);

    const fetchEmpLogs = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get('/api/user/fetchEmplogs', config);
            setEmplogs(data.logs || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching the emplogs:', error);
            setLoading(false);
        }
    };

    const prepareChartData = () => {
        const userTimeMap = {};

        emplogs.forEach(log => {
            const startDate = new Date(log.startTime);
            if (startDate.getMonth() === currentMonth.getMonth() && startDate.getFullYear() === currentMonth.getFullYear()) {
                const endDate = new Date(log.endTime);
                const diff = (endDate - startDate) / 1000 / 60 / 60; // Difference in hours

                if (userTimeMap[log.userId.name]) {
                    userTimeMap[log.userId.name] += diff;
                } else {
                    userTimeMap[log.userId.name] = diff;
                }
            }
        });

        const chartData = {
            labels: Object.keys(userTimeMap),
            datasets: [
                {
                    label: 'Total Time on Site (hours)',
                    data: Object.values(userTimeMap),
                    backgroundColor: Object.keys(userTimeMap).map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
                    borderColor: Object.keys(userTimeMap).map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
                    borderWidth: 1,
                },
            ],
        };

        setChartData(chartData);
    };

    const generateCSV = () => {
        let csvContent = "";
        csvContent += "UserId,UserName,StartTime,EndTime,DurationHours\n"; // Column headers
        emplogs.forEach(log => {
            const durationHours = ((new Date(log.endTime) - new Date(log.startTime)) / 1000).toFixed(0);
            csvContent += `${log.userId._id},${log.userId.name},${log.startTime},${log.endTime},${durationHours}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        setCsvUrl(URL.createObjectURL(blob));
    };

    const changeMonth = (delta) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + delta));
        setCurrentMonth(newMonth);
    };

    return (
        <div className='emp-log-chart-container'>
            <div className="navi-csv-set">
                <div className="emp-log-chart-month-navigator">
                    <button onClick={() => changeMonth(-1)}>Prev</button>
                    <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => changeMonth(1)}>Next</button>
                </div>
                {csvUrl && <a id='anch-csv' href={csvUrl} download="EmpLogs.csv">Employee Activity Logs CSV <i className="fa-solid fa-file-csv"></i></a>}
            </div>
            <div className="emp-log-chart-chart">
                {loading ? <p>Loading...</p> : (chartData.labels.length > 0 ? (
                    <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
                ) : <p>No data for this month.</p>)}
            </div>
        </div>
    );
};

export default EmpLogChart;
