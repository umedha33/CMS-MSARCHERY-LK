import React, { useState } from 'react'
import './CustNoteSubmit.css'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';

const CustNoteSubmit = () => {
    const [custNoteTitle, setCustNoteTitle] = useState('');
    const [custNoteDescription, setCustNoteDescription] = useState('');
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [custNoteFiles, setCustNoteFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = ChatState();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setCustNoteFiles((prev) => [...prev, ...newAttachments]);
    };

    const handleRemoveFile = (index) => {
        setCustNoteFiles(prev => prev.filter((_, idx) => idx !== index));
    };

    const createContent = async () => {
        setLoading(true);

        if (!custNoteTitle || !custNoteDescription || !custName || !custPhone) {
            window.alert("Please fill all the feilds!")
            return
        }

        try {
            const formData = new FormData();
            formData.append('custNoteTitle', custNoteTitle);
            formData.append('custNoteDescription', custNoteDescription);
            formData.append('custName', custName);
            formData.append('custPhone', custPhone);

            custNoteFiles.forEach((attachment) => {
                formData.append('custNoteFiles', attachment.file);
            });

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/mysub/addCustNote', formData, config);
            console.log('Cust note data: ', data);

            if (data) {
                window.alert("Customer Note Successfully Created!")
                setLoading(false);
            }

        } catch (error) {
            console.error('Error occurred while creating the content', error);
        }
    };

    return (
        <div className="btm-mysub-panel">
            <div className="mysub-btmset">
                <div className="inp-fm-sec">
                    <label>Customer Note Title</label>
                    <input type="text" value={custNoteTitle} onChange={(e) => setCustNoteTitle(e.target.value)} />
                </div>
                <div className="inp-fm-sec">
                    <label>Customer Note Description</label>
                    <input type="text" value={custNoteDescription} onChange={(e) => setCustNoteDescription(e.target.value)} />
                </div>
                <div className="inp-fm-sec">
                    <label>Customer Name</label>
                    <input type="text" value={custName} onChange={(e) => setCustName(e.target.value)} />
                </div>
                <div className="inp-fm-sec">
                    <label>Customer Phone</label>
                    <input type="text" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} />
                </div>
            </div>

            <div className="attachment-container2">
                <div className="bottom-container">
                    <label id='lbl-img'>Customer Note Attachements »</label>
                    <div className="file-input2">
                        <label htmlFor="file-upload" className="file-upload">
                            Upload Files<i className="fa-solid fa-folder"></i>
                        </label>
                        <input id="file-upload"
                            type="file"
                            name="custNoteFiles"
                            accept=".png,.jpg,.jpeg,.pdf,.docx"
                            onChange={handleFileChange}
                            multiple />
                    </div>

                    <div className="image-preview3">
                        {custNoteFiles.map((file, index) => (
                            <div key={index} className="thumbnail">
                                <i onClick={() => handleRemoveFile(index)} className="fa-solid fa-circle-xmark"></i>
                                <img src={file.preview} alt={`Thumbnail ${index}`} />
                                <p>{file.file.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="submtbtn-mysb2">
                <button onClick={() => createContent()} disabled={loading}>
                    {loading ? <div className="spinner1"></div> : 'SUBMIT'}
                </button>
            </div>
        </div>

    )
}

export default CustNoteSubmit
