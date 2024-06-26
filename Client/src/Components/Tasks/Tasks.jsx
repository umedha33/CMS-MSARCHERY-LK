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
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [addComment, setAddComment] = useState('');
    const [refLink, setRefLink] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [newRecipient, setNewRecipient] = useState('');
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
                // console.log(data);
            }

        } catch (error) {
            console.error('Error occurred while fetching the task', error);
        }
    };

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
            fetchAsnTasks();
            setShowModal(false);

        } catch (error) {
            window.alert('Error occurred');
        }
    };

    const deleteTask = async (taskId) => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.delete(`/api/task/deletetask?taskId=${taskId}`, config);

            console.log(`status update: `, response);
            fetchAsnTasks();
            fetchTasks();

        } catch (error) {
            window.alert('Error occurred');
        }
    };

    const updateAsnTask = async (taskId, title, description, recipient, dueDate, status, addComments, refLinks) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.put('/api/task/updatetask', {
                taskId: taskId,
                title: title,
                description: description,
                recipient: recipient,
                dueDate: dueDate,
                status: "Ongoing",
                addComments: addComments,
                refLinks: refLinks,
            }, config);

            console.log(`task update: `, response);
            fetchAsnTasks();
            fetchTasks();
            setShowEditModal(false);
        } catch (error) {
            window.alert('Error occurred');
        }
    };

    const checkAndUpdateOverdueTasks = async () => {
        const today = new Date().toISOString().split('T')[0];

        allTasks.forEach(async (task) => {
            const dueDate = task.taskDueDate ? task.taskDueDate.split('T')[0] : null;

            if (dueDate && dueDate < today && task.taskStatus !== 'overdue' && task.taskStatus !== 'completed') {
                await updateStatus(task.taskId, 'overdue');

                if (selectedTask && selectedTask.taskId === task.taskId) {
                    setNewStatus('overdue');
                }
            }
        });
    };

    useEffect(() => {
        fetchTasks();
        fetchAsnTasks();
        checkAndUpdateOverdueTasks();
    }, []);

    const editStatusBtn = (task) => {
        setSelectedTask(task);
        setNewStatus(task.taskStatus);
        setShowModal(true);
    };

    const editTaskBtn = (task) => {
        setSelectedTask(task);
        setTaskTitle(task.taskTitle);
        setTaskDescription(task.taskDescription);
        setAddComment(task.taskAddComments);
        setRefLink(task.taskRefLinks);
        setTaskDueDate(task.taskDueDate ? task.taskDueDate.split('T')[0] : '');
        setNewRecipient(task.taskRecipient);
        setShowEditModal(true);
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
    const handleTitleChange = (event) => setTaskTitle(event.target.value);
    const handleDescriptionChange = (event) => setTaskDescription(event.target.value);
    const handleAddCommChange = (event) => setAddComment(event.target.value);
    const handleRefLinkChange = (event) => setRefLink(event.target.value);
    const handleDueDateChange = (event) => setTaskDueDate(event.target.value);
    const handleRecipientChange = (event) => setNewRecipient(event.target.value);

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
                                                    <i id='edit-btn' className="fa-solid fa-eye" onClick={() => editStatusBtn(task)}></i>
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
                                                    <i id='edit-btn' className="fa-solid fa-pen-to-square" onClick={() => editTaskBtn(task)}></i>
                                                    <br />
                                                    <i id='delete-btn' className="fa-solid fa-trash" onClick={() => deleteTask(task.taskId)}></i>
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
                            <h2 id='mdl-hdr'>Task Details</h2>
                            {selectedTask && (
                                <div className="modal-details">
                                    <p><strong>Task ID:</strong> {selectedTask.taskId}</p>
                                    <p><strong>Title:</strong> {selectedTask.taskTitle}</p>
                                    <p><strong>Description:</strong> {selectedTask.taskDescription}</p>
                                    <p><strong>Assigned By:</strong> {selectedTask.taskAssigner.name}</p>
                                    <p><strong>Assigned Date:</strong> {formatDate(selectedTask.taskAsnDate)}</p>
                                    <p><strong>Due Date:</strong> {formatDate(selectedTask.taskDueDate)}</p>
                                    <p><strong>Additional Comments:</strong> {`${selectedTask.taskAddComments}` || "-"}</p>
                                    <p><strong>Referral Links:</strong> {`${selectedTask.taskRefLinks}` || "-"}</p>
                                    <div className='files-modl2'>
                                        <p>
                                            {selectedTask.taskAttachments.length > 0 ? (
                                                selectedTask.taskAttachments.map((file, index, array) => (
                                                    <React.Fragment key={index}>
                                                        <a href={file.fileUrl}>{file.fileName}</a>
                                                        {index < array.length - 1 && ', '}
                                                        <br />
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                "No Files"
                                            )}
                                        </p>
                                    </div>
                                    <div className='stts'>
                                        <label id='stts-lbl' htmlFor="status">Status: </label>
                                        <select
                                            id="status"
                                            value={newStatus}
                                            onChange={handleStatusChange} >
                                            <option value="ongoing">Ongoing</option>
                                            <option value="completed">Completed</option>
                                            <option value="alert">Alert</option>
                                            <option disabled value="overdue">Overdue</option>
                                        </select>
                                    </div>
                                    <div className="modal-actions">
                                        <button onClick={() => updateStatus(selectedTask.taskId, newStatus)}>Save Changes</button>
                                        <button onClick={() => setShowModal(false)}>Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {showEditModal && (
                    <div className="modal-overlay">
                        <div className="modal-content2">
                            <h2 id='mdl-hdr'>Edit Task</h2>
                            {selectedTask && (
                                <div className="modal-details">
                                    <p><strong>Task ID: </strong>{selectedTask.taskId}</p>
                                    <p><strong>{`Files (Uneditable):`} </strong></p>
                                    <div className='files-modl'>
                                        <p>
                                            {selectedTask.taskAttachments.length > 0 ? (
                                                selectedTask.taskAttachments.map((file, index, array) => (
                                                    <React.Fragment key={index}>
                                                        {file.fileName}
                                                        {index < array.length - 1 && ', '}
                                                        <br />
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                "No Files"
                                            )}
                                        </p>
                                    </div>
                                    <div className='inps-mdl'>
                                        <p><strong>Title: </strong> </p>
                                        <input
                                            type="text"
                                            className='inpt-modl'
                                            value={taskTitle}
                                            onChange={handleTitleChange}
                                        />
                                    </div>
                                    <div className='inps-mdl'>
                                        <p><strong>Description: </strong></p>
                                        <textarea
                                            className='txtar-modl'
                                            value={taskDescription}
                                            onChange={handleDescriptionChange}>
                                        </textarea>
                                    </div>
                                    <div className='inps-mdl'>
                                        <p><strong>Additional Comments: </strong></p>
                                        <textarea
                                            className='txtar-modl2'
                                            value={addComment}
                                            onChange={handleAddCommChange}>
                                        </textarea>
                                    </div>
                                    <div className='inps-mdl'>
                                        <p><strong>Referral Links: </strong></p>
                                        <textarea
                                            className='txtar-modl3'
                                            value={refLink}
                                            onChange={handleRefLinkChange}>
                                        </textarea>
                                    </div>
                                    <div className='inps-mdl'>
                                        <p><strong>Due Date:</strong></p>
                                        <input
                                            type="date"
                                            className='caln-modl'
                                            value={taskDueDate}
                                            onChange={handleDueDateChange}
                                        />
                                    </div>
                                    <div className='stts'>
                                        <label id='stts-lbl' htmlFor="status"><strong>Recipient: </strong></label>
                                        <select
                                            // id="status"
                                            className='rsp-slct'
                                            value={newRecipient}
                                            onChange={handleRecipientChange}
                                        >
                                            <option value="Manager">Manager</option>
                                            <option value="Accountant">Accountant</option>
                                            <option value="E-Com-Manager">E-Com Manager</option>
                                            <option value="Sales-Manager">Sales & Marketing Manager</option>
                                            <option value="Content-Creator">Content Creator</option>
                                            <option value="Customer-Care">Customer Care</option>
                                            <option value="Logistics-Preperation">Logistics & Preperation Manager</option>
                                        </select>
                                    </div>
                                    <div className="modal-actions">
                                        <button onClick={() => updateAsnTask(selectedTask.taskId, taskTitle, taskDescription, newRecipient, taskDueDate, newStatus, addComment, refLink)}>Save Changes</button>
                                        <button onClick={() => setShowEditModal(false)}>Close</button>
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
