import React, { useState } from 'react';
import './AssignTask.css'

const AssignTask = () => {

    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const fileArray = Array.from(fileList).map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setFiles(prevFiles => [...prevFiles, ...fileArray]); // Concatenate the arrays
    };


    return (
        <div className='assign-task-container'>
            <div className="row1-assign-header">
                <h1>Add Task</h1>
                <button>Close</button>
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
                            <option value="E-Com-Manager">E-Com-Manager</option>
                            <option value="Sales-Manager">Sales-Manager</option>
                            <option value="Marketing-Manager">Marketing-Manager</option>
                            <option value="Content-Creator">Content-Creator</option>
                            <option value="Customer-Care">Customer-Care</option>
                            <option value="Logistics-Preperation">Logistics-Preperation</option>
                        </select>
                    </div>
                    <div className="input-couples">
                        <label>Set Due Date:</label>
                        <input type="date" id='due-date' />
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
                        <label>Images:</label>
                        <div className="file-input">
                            <input
                                type="file"
                                id="attachment-images"
                                name="attachment-images"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                multiple
                            />
                        </div>
                        <div className="image-preview">
                            {files.map((file, index) => (
                                <div key={index} className="thumbnail">
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
