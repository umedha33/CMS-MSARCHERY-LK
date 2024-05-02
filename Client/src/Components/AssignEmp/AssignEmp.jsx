import React, { useState } from 'react'
import './AssignEmp.css'

const AssignEmp = ({ activeNavElem }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [role, setRole] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [showHide, setShowHide] = useState(false);

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(Object.assign(selectedFile, {
                preview: URL.createObjectURL(selectedFile)
            }));
        }
        postDetails();
    };

    const postDetails = (pics) => {

    }

    const handleRemoveFile = () => {
        setFile(null);
    };

    const togglePasswordVisibility = () => {
        setShowHide(!showHide);
    };

    const consFunc = () => {
        console.log(name, email, phone, role, password, confirmpassword);
    }

    return (
        <div className='assign-emp-container'>
            <div className="row1-assignemp-header">
                <h1>Add Employee</h1>
                <div className="button-set">
                    <button id='add-btn' onClick={() => { consFunc() }}>Submit</button>
                    <button id='close-btn' onClick={() => { activeNavElem('Employees'); }}>Close</button>
                </div>
            </div>

            <div className="row2-divider">
                <h2>.</h2>
            </div>

            <div className="row3-assignemp-form">

                <div className="empform-container">
                    <h1>Fill in relevant information to add an employee » </h1>

                    <div className="first-grid">
                        <div className="single-couple">
                            <label for="first-name">Full Name:</label>
                            <input type="text"
                                id="first-name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>

                        <div className="single-couple">
                            <label for="contact-number">Contact Number:</label>
                            <input type="text" id="contact-number" placeholder="Enter Contact Number"
                                onChange={(e) => setPhone(e.target.value)}
                                required />
                        </div>
                        <div className="single-couple">
                            <label for="emp-email">Email Address:</label>
                            <input type="email"
                                id="emp-email"
                                placeholder="Enter Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>

                        <div className="single-couple">
                            <label for="emp-post">Employee Post:</label>
                            <select name="emp-post" id="emp-post" onChange={(e) => setRole(e.target.value)} required>
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

                        <div className="single-couple pass">
                            <label for="e-password">Password:</label>
                            <input type={showHide ? 'text' : 'password'}
                                id="e-password"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <button onClick={togglePasswordVisibility}>
                                {showHide ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <div className="single-couple pass">
                            <label for="e-password">Confirm Password:</label>
                            <input type={showHide ? 'text' : 'password'}
                                id="e-password"
                                placeholder="Re-enter Password"
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                required />
                            <button id='passbtn2' onClick={togglePasswordVisibility}>
                                {showHide ? 'Hide' : 'Show'}
                            </button>
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
