import React, { useState } from 'react'
import './Tasks.css'
import dummyData from '../Assets/tasks-dummy.json'

const Tasks = () => {

    const [selectedBreadcrumb, setSelectedBreadcrumb] = useState('All');

    const sortedData = dummyData.sort((a, b) => b.id - a.id);

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <span className='status-ico'><i className="fa-solid fa-circle-check"></i></span>;
            case "ongoing":
                return <span className='status-ico'><i className="fa-solid fa-bars-progress"></i></span>;
            case "overdue":
                return <span className='status-ico'><i className="fa-solid fa-clock-rotate-left"></i></span>;
            case "alert":
                return <span className='status-ico'><i className="fa-solid fa-circle-exclamation"></i></span>;
            default:
                return null;
        }
    };

    const filteredData = dummyData.filter(task => {
        if (selectedBreadcrumb === 'All') return true;
        return task.status === selectedBreadcrumb.toLowerCase();
    });

    return (
        <div>
            <div className="tasks-container">

                <div className="row1-task-header">
                    <h1>Tasks</h1>
                    <button>Assign Task</button>
                </div>

                <div className="row2-sort-header">
                    <div className="bread-crum">
                        <h2 className={selectedBreadcrumb === 'All' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('All')}>All</h2>
                        <h2 className={selectedBreadcrumb === 'Ongoing' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Ongoing')}>Ongoing</h2>
                        <h2 className={selectedBreadcrumb === 'Completed' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Completed')}>Completed</h2>
                        <h2 className={selectedBreadcrumb === 'Overdue' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Overdue')}>Overdue</h2>
                        <h2 className={selectedBreadcrumb === 'Alert' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Alert')}>Alerts</h2>
                    </div>
                </div>

                <div className="row3-task-table">
                    <table id='table-setting'>
                        <thead id='table-heading'>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Recipient</th>
                                <th>Assigned Date</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id='table-elements'>
                            {filteredData.map((task) => (
                                <tr key={task.id}>
                                    <td id='id-col'>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.recipient}</td>
                                    <td>{task.assignDate}</td>
                                    <td>{task.dueDate}</td>
                                    <td>{getStatusIcon(task.status)}</td>
                                    <td>
                                        <span className='action-btn'>
                                            <i id='edit-btn' className="fa-solid fa-pen-to-square"></i>
                                            <br />
                                            <i id='delete-btn' className="fa-solid fa-trash"></i>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Tasks
