import React, { useEffect, useState } from 'react';
import './AssignTask.css'

const AssignTask = ({ activeNavElem }) => {

    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const fileArray = Array.from(fileList).map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setFiles(prevFiles => [...prevFiles, ...fileArray]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('due-date').setAttribute('min', today);
    }, []);

    return (
        <div className='assign-task-container'>
            <div className="row1-assign-header">
                <h1>Add Task</h1>
                <div className="button-set">
                    <button id='add-btn'>Submit</button>
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
                        <input type="text" id='title-text' placeholder='Give a short title for the task' />
                    </div>
                    <div className="input-couples">
                        <label>Task Description:</label>
                        <textarea name="description" id="description" cols="30" rows="10" placeholder='Provide a clear description about the task in breif'></textarea>
                    </div>
                    <div className="input-couples">
                        <label>Select Recipient:</label>
                        <select name="recipient" id="recipient">
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
                        <input type="date" id="due-date" />
                    </div>
                </div>

                <div className="attachment-container">
                    <h1>Attachments » </h1>
                    <div className="input-couples">
                        <label>Additional Comments:</label>
                        <textarea name="comment" id="comment" cols="30" rows="10" placeholder='Provide additional comments if required'></textarea>
                    </div>
                    <div className="input-couples">
                        <label>Referral Links:</label>
                        <textarea name="reflinks" id="reflinks" cols="30" rows="10" placeholder='Provide referral links if available'></textarea>
                    </div>

                    <div className="bottom-container">
                        <label id='lbl-img'>Images:</label>
                        <div className="file-input">
                            <label for="file-upload" class="file-upload">
                                Upload Files<i class="fa-solid fa-folder"></i>
                            </label>
                            <input id="file-upload"
                                type="file"
                                name="attachment-images"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                multiple />
                        </div>

                        <div className="image-preview">
                            {files.map((file, index) => (
                                <div key={index} className="thumbnail">
                                    <i onClick={() => handleRemoveFile(index)} class="fa-solid fa-circle-xmark"></i>
                                    <img src={file.preview} alt={`Thumbnail ${index}`} />
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignTask
