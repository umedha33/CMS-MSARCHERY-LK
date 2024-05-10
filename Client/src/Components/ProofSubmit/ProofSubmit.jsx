import React, { useState } from 'react'
import './ProofSubmit.css'
import { ChatState } from './../../context/ChatProvider';
import axios from 'axios';

const ProofSubmit = () => {
    const [proofId, setProofId] = useState('');
    const [proofTitle, setProofTitle] = useState('');
    const [proofAttachments, setProofAttachments] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = ChatState();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setProofAttachments((prev) => [...prev, ...newAttachments]);
    };

    const handleRemoveFile = (index) => {
        setProofAttachments(prev => prev.filter((_, idx) => idx !== index));
    };

    const createContent = async () => {
        setLoading(true);

        if (!proofTitle) {
            window.alert("Please provide a title!")
            return
        }

        try {
            const formData = new FormData();
            formData.append('proofTitle', proofTitle);

            proofAttachments.forEach((attachment) => {
                formData.append('proofAttachments', attachment.file);
            });

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/mysub/addProof', formData, config);
            console.log('Proof data: ', data);

            if (data) {
                window.alert("Proof Successfully Created!")
                setLoading(false);
            }

        } catch (error) {
            console.error('Error occurred while creating the proof', error);
        }
    };

    return (
        <div className="btm-mysub-panel">
            <div className="mysub-btmset2">
                <div className="inp-fm-sec">
                    <label>Proof Title</label>
                    <input type="text" value={proofTitle} onChange={(e) => setProofTitle(e.target.value)} />
                </div>
            </div>

            <div className="attachment-container2">
                <div className="bottom-container">
                    <label id='lbl-img'>Proof Attachements »</label>
                    <div className="file-input2">
                        <label htmlFor="file-upload" className="file-upload">
                            Upload Files<i className="fa-solid fa-folder"></i>
                        </label>
                        <input id="file-upload"
                            type="file"
                            name="proofAttachments"
                            accept=".png,.jpg,.jpeg,.pdf,.docx"
                            onChange={handleFileChange}
                            multiple />
                    </div>

                    <div className="image-preview2">
                        {proofAttachments.map((file, index) => (
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

export default ProofSubmit
