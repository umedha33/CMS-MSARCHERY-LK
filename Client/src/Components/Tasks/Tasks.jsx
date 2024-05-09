import React, { useState, useEffect } from 'react';
import './Tasks.css';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const Tasks = ({ activeNavElem }) => {
    const [selectedBreadcrumb, setSelectedBreadcrumb] = useState('All');
    const [allTasks, setAllTasks] = useState([]);
    const [allAsnTasks, setAllAsnTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const { user } = ChatState();

    const fetchTasks = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.get('/api/task/fetchtasks', config);

            if (data) {
                setAllTasks(data.tasks);
                setLoading(false);
            }

        } catch (error) {
            console.error('Error occurred while fetching the task', error);
        }
    };

    const fetchAsnTasks = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.get('/api/task/fetchasntasks', config);

            if (data) {
                setAllAsnTasks(data.asnTasks);
                setLoading(false);
            }

        } catch (error) {
            console.error('Error occurred while fetching the task', error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchAsnTasks();
    }, []);

    const updateStatus = async (taskId, status) => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.put('/api/task/updatetskstatus', {
                taskId: taskId,
                status: status,
            }, config);

            console.log(`status update: `, response);
            fetchTasks();

        } catch (error) {
            window.alert('Error occurred');
        }
    };

    const editStatusBtn = (task) => {
        setSelectedTask(task);
        setNewStatus(task.taskStatus);
        setShowModal(true); // Open modal
    };

    const assignClick = (item) => {
        activeNavElem(item);
    };

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

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return 'N/A';
        return date.toISOString().split('T')[0];
    };

    const handleStatusChange = (event) => setNewStatus(event.target.value);

    const filteredData = allTasks.filter(task => {
        if (selectedBreadcrumb === 'All') return true;
        return task.taskStatus.toLowerCase() === selectedBreadcrumb.toLowerCase();
    });

    return (
        <div>
            <div className="tasks-container">

                <div className="row1-task-header">
                    <h1>Tasks</h1>
                    <button onClick={() => assignClick('Assign Task')}>Assign Task</button>
                </div>

                <div className="row2-sort-header">
                    <div className="bread-crum">
                        <h2 className={selectedBreadcrumb === 'All' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('All')}>All</h2>
                        <h2 className={selectedBreadcrumb === 'Ongoing' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Ongoing')}>Ongoing</h2>
                        <h2 className={selectedBreadcrumb === 'Completed' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Completed')}>Completed</h2>
                        <h2 className={selectedBreadcrumb === 'Overdue' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Overdue')}>Overdue</h2>
                        <h2 className={selectedBreadcrumb === 'Alert' ? 'activeBreadcrumb' : ''} onClick={() => setSelectedBreadcrumb('Alert')}>Alerts</h2>
                        <h2 id='asgnd-tsks' className={selectedBreadcrumb === 'Assigned Tasks' ? 'activeBreadcrumb-id' : ''} onClick={() => setSelectedBreadcrumb('Assigned Tasks')}>Assigned Tasks</h2>
                    </div>
                </div>

                <div className="row3-task-table">

                    {['All', 'Ongoing', 'Completed', 'Overdue', 'Alert'].includes(selectedBreadcrumb) ? (
                        <table id='table-setting'>
                            <thead id='table-heading'>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Assigned By</th>
                                    <th>Assigned Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id='table-elements'>
                                {loading ? (
                                    <div className="lodn-cont">
                                        <div className="loading-spinner"></div>
                                    </div>
                                ) : (
                                    filteredData.map((task) => (
                                        <tr key={task.taskId}>
                                            <td id='id-col'>{task.taskId}</td>
                                            <td>{task.taskTitle}</td>
                                            <td>{task.taskDescription}</td>
                                            <td>{task.taskAssigner.name}</td>
                                            <td>{formatDate(task.taskAsnDate)}</td>
                                            <td>{formatDate(task.taskDueDate)}</td>
                                            <td>{getStatusIcon(task.taskStatus.toLowerCase())}</td>
                                            <td>
                                                <span className='action-btn'>
                                                    <i id='edit-btn' className="fa-solid fa-pen-to-square" onClick={() => editStatusBtn(task)}></i>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table id='table-setting'>
                            <thead id='table-heading-asns'>
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
                                {loading ? (
                                    <div className="lodn-cont">
                                        <div className="loading-spinner"></div>
                                    </div>
                                ) : (
                                    allAsnTasks.map((task) => (
                                        <tr key={task.taskId}>
                                            <td id='id-col'>{task.taskId}</td>
                                            <td>{task.taskTitle}</td>
                                            <td>{task.taskDescription}</td>
                                            <td>{task.taskRecipient}</td>
                                            <td>{formatDate(task.taskAsnDate)}</td>
                                            <td>{formatDate(task.taskDueDate)}</td>
                                            <td>{getStatusIcon(task.taskStatus.toLowerCase())}</td>
                                            <td>
                                                <span className='action-btn'>
                                                    <i id='edit-btn' className="fa-solid fa-pen-to-square"></i>
                                                    <br />
                                                    <i id='delete-btn' className="fa-solid fa-trash"></i>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}

                </div>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2 id='mdl-hdr'>Edit Task Status</h2>
                            {selectedTask && (
                                <div className="modal-details">
                                    <p><strong>Title:</strong> {selectedTask.taskTitle}</p>
                                    <p><strong>Task ID:</strong> {selectedTask.taskId}</p>
                                    <p><strong>Due Date:</strong> {formatDate(selectedTask.taskDueDate)}</p>
                                    <div className='stts'>
                                        <label id='stts-lbl' htmlFor="status">Status: </label>
                                        <select
                                            id="status"
                                            value={newStatus}
                                            onChange={handleStatusChange} >
                                            <option value="ongoing">Ongoing</option>
                                            <option value="completed">Completed</option>
                                            <option value="overdue">Overdue</option>
                                            <option value="alert">Alert</option>
                                        </select>
                                    </div>
                                    <div className="modal-actions">
                                        <button onClick={() => updateStatus(selectedTask.taskId, newStatus)}>Save Changes</button>
                                        <button onClick={() => setShowModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Tasks;
