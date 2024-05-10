import React, { useState } from 'react'
import './ContentSubmit.css'
import { ChatState } from './../../context/ChatProvider';
import axios from 'axios';

const ContentSubmit = () => {
    const [contentId, setContentId] = useState('');
    const [contentTitle, setContentTitle] = useState('');
    const [contentAttachments, setContentAttachments] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = ChatState();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setContentAttachments((prev) => [...prev, ...newAttachments]);
    };

    const handleRemoveFile = (index) => {
        setContentAttachments(prev => prev.filter((_, idx) => idx !== index));
    };

    const createContent = async () => {
        setLoading(true);

        if (!contentTitle) {
            window.alert("Please provide a title!")
            return
        }

        try {
            const formData = new FormData();
            formData.append('contentTitle', contentTitle);

            contentAttachments.forEach((attachment) => {
                formData.append('contentAttachments', attachment.file);
            });

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/mysub/addContent', formData, config);
            console.log('Content data: ', data);

            if (data) {
                window.alert("Content Successfully Created!")
                setLoading(false);
            }

        } catch (error) {
            console.error('Error occurred while creating the content', error);
        }
    };

    return (
        <div className="btm-mysub-panel">
            <div className="mysub-btmset2">
                <div className="inp-fm-sec">
                    <label>Content Title</label>
                    <input type="text" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} />
                </div>
            </div>

            <div className="attachment-container2">
                <div className="bottom-container">
                    <label id='lbl-img'>Content Attachements »</label>
                    <div className="file-input2">
                        <label htmlFor="file-upload" className="file-upload">
                            Upload Files<i className="fa-solid fa-folder"></i>
                        </label>
                        <input id="file-upload"
                            type="file"
                            name="contentAttachments"
                            accept=".png,.jpg,.jpeg,.pdf,.docx"
                            onChange={handleFileChange}
                            multiple />
                    </div>

                    <div className="image-preview2">
                        {contentAttachments.map((file, index) => (
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

export default ContentSubmit
