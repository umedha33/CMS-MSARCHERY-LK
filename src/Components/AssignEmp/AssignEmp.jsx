import React, { useState } from 'react'
import './AssignEmp.css'

const AssignEmp = ({ activeNavElem }) => {

    const [file, setFile] = useState(null);
    
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(Object.assign(selectedFile, {
                preview: URL.createObjectURL(selectedFile)
            }));
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };


    return (
        <div className='assign-emp-container'>
            <div className="row1-assignemp-header">
                <h1>Add Employee</h1>
                <div className="button-set">
                    <button id='add-btn'>Submit</button>
                    <button id='close-btn' onClick={() => { activeNavElem('Employees'); }}>Close</button>
                </div>
            </div>

            <div className="row2-divider">
                <h2>.</h2>
            </div>

            <div class="row3-assignemp-form">

                <div class="empform-container">
                    <h1>Fill in relevant information to add an employee » </h1>

                    <div class="first-grid">
                        <div class="single-couple">
                            <label for="first-name">First Name:</label>
                            <input type="text" id="first-name" placeholder="Enter First Name" />
                        </div>
                        <div class="single-couple">
                            <label for="last-name">Last Name:</label>
                            <input type="text" id="last-name" placeholder="Enter Last Name" />
                        </div>
                        <div class="single-couple">
                            <label for="contact-number">Contact Number:</label>
                            <input type="text" id="contact-number" placeholder="Enter Contact Number" />
                        </div>
                        <div class="single-couple">
                            <label for="emp-email">Email Address:</label>
                            <input type="text" id="emp-email" placeholder="Enter Email Address" />
                        </div>

                        <div class="single-couple">
                            <label for="username">Username:</label>
                            <input type="text" id="username" placeholder="Enter Username" />
                        </div>
                        <div class="single-couple">
                            <label for="e-password">Password:</label>
                            <input type="text" id="e-password" placeholder="Enter Password" />
                        </div>
                    </div>
                    <div className="profilepic-container">
                        <label id='lbl-img'>Profile Picture:</label>
                        <div className="pp-input">
                            <label htmlFor="file-upload" className="file-upload">
                                Upload File <i className="fa-solid fa-folder"></i>
                            </label>
                            <input id="file-upload"
                                type="file"
                                name="attachment-image"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange} />
                        </div>
                        <div className="pp-preview">
                            {file && (
                                <div className="pp-thumbnail">
                                    <i onClick={handleRemoveFile} className="fa-solid fa-circle-xmark pp-close"></i>
                                    <img src={file.preview} alt={`Thumbnail`} />
                                    <p>{file.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignEmp
