import React, { useEffect, useState } from 'react';
import './AssignTask.css';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const AssignTask = ({ activeNavElem }) => {
    const { user } = ChatState();

    // Task form state
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskRecipient, setTaskRecipient] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskStatus, setTaskStatus] = useState('Pending');
    const [taskAddComments, setTaskAddComments] = useState('');
    const [taskRefLinks, setTaskRefLinks] = useState('');
    const [taskAttachments, setTaskAttachments] = useState([]);
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const fileArray = Array.from(fileList).map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles(prevFiles => [...prevFiles, ...fileArray]);
        setTaskAttachments(prev => [...prev, ...fileList]);
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index));
        setTaskAttachments(prev => prev.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('due-date').setAttribute('min', today);
    }, []);

    const createTask = async () => {
        try {
            const formData = new FormData();
            formData.append('taskTitle', taskTitle);
            formData.append('taskDescription', taskDescription);
            formData.append('taskRecipient', taskRecipient);
            formData.append('taskDueDate', taskDueDate);
            formData.append('taskStatus', taskStatus);
            formData.append('taskAddComments', taskAddComments);
            formData.append('taskRefLinks', taskRefLinks);

            taskAttachments.forEach((file, index) => {
                formData.append(`taskAttachments`, file);
            });

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.post('/api/task/addtask', formData, config);

            console.log(`Task data: `, data);
            activeNavElem('Tasks'); // Redirect or update navigation on successful task creation

        } catch (error) {
            console.error('Error occurred while creating the task', error);
        }
    };

    return (
        <div className='assign-task-container'>
            <div className="row1-assign-header">
                <h1>Add Task</h1>
                <div className="button-set">
                    <button id='add-btn' onClick={createTask}>Submit</button>
                    <button id='close-btn' onClick={() => { activeNavElem('Tasks'); }}>Close</button>
                </div>
            </div>

            <div className="row2-divider">
                <h2>.</h2>
            </div>

            <div className="row3-assign-form">
                <div className="form-container">
                    <h1>Fill in necessary information to set a task » </h1>
                    <div className="input-couples">
                        <label>Task Title:</label>
                        <input type="text" id='title-text' placeholder='Give a short title for the task'
                            value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                    </div>
                    <div className="input-couples">
                        <label>Task Description:</label>
                        <textarea name="description" id="description" cols="30" rows="10"
                            placeholder='Provide a clear description about the task in brief'
                            value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                    </div>
                    <div className="input-couples">
                        <label>Select Recipient:</label>
                        <select name="recipient" id="recipient" value={taskRecipient} onChange={(e) => setTaskRecipient(e.target.value)}>
                            <option value="" disabled selected hidden>Not Selected</option>
                            <option value="Manager">Manager</option>
                            <option value="Accountant">Accountant</option>
                            <option value="E-Com-Manager">E-Com Manager</option>
                            <option value="Sales-Manager">Sales & Marketing Manager</option>
                            <option value="Content-Creator">Content Creator</option>
                            <option value="Customer-Care">Customer Care</option>
                            <option value="Logistics-Preperation">Logistics & Preperation Manager</option>
                        </select>
                    </div>
                    <div className="input-couples">
                        <label>Set Due Date:</label>
                        <input type="date" id="due-date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                    </div>
                </div>

                <div className="attachment-container">
                    <h1>Attachments » </h1>
                    <div className="input-couples">
                        <label>Additional Comments:</label>
                        <textarea name="comment" id="comment" cols="30" rows="10"
                            placeholder='Provide additional comments if required'
                            value={taskAddComments} onChange={(e) => setTaskAddComments(e.target.value)}></textarea>
                    </div>
                    <div className="input-couples">
                        <label>Referral Links:</label>
                        <textarea name="reflinks" id="reflinks" cols="30" rows="10"
                            placeholder='Provide referral links if available'
                            value={taskRefLinks} onChange={(e) => setTaskRefLinks(e.target.value)}></textarea>
                    </div>

                    <div className="bottom-container">
                        <label id='lbl-img'>Files:</label>
                        <div className="file-input">
                            <label htmlFor="file-upload" className="file-upload">
                                Upload Files<i className="fa-solid fa-folder"></i>
                            </label>
                            <input id="file-upload"
                                type="file"
                                name="taskAttachments"  // This name should match the multer field name
                                accept=".png,.jpg,.jpeg,.pdf,.docx"
                                onChange={handleFileChange}
                                multiple />
                        </div>

                        <div className="image-preview">
                            {files.map((file, index) => (
                                <div key={index} className="thumbnail">
                                    <i onClick={() => handleRemoveFile(index)} className="fa-solid fa-circle-xmark"></i>
                                    <img src={file.preview} alt={`Thumbnail ${index}`} />
                                    <p>{file.file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignTask;
