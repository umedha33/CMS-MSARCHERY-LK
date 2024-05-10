import React, { useEffect, useState } from 'react'
import './CustNoteCard.css'
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const CustNoteCard = () => {
    const [loading, setLoading] = useState(false);
    const [custnotes, setCustnotes] = useState([]);
    const { user } = ChatState();

    const fetchContent = async () => {
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.get('/api/mysub/fetchCustNote', config);

            if (data) {
                console.log('All custnote data:', data.custnote);
                setCustnotes(data.custnote);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };

    useEffect(() => {
        fetchContent();
    }, [])

    return (
        <div className='contnt-card-container'>
            <div className="crd-hdr-contn">
                <h2>Customer Notes</h2>
            </div>
            <div className="cntnt-itms-panl">
                {!loading ? (
                    <div className="cntnt-itms-panl23">
                        {custnotes.map(note => (
                            <div key={note._id} className="cust-note-card">
                                <h3 id='note-id'>{note.custNoteId}</h3>
                                <h3>{note.custNoteTitle}</h3>
                                <p>{note.custNoteDescription}</p>
                                <div className='cust-data-set'>
                                    <span id='custname-spn'>{note.custName}</span>
                                    <span>0{note.custPhone}</span>
                                    <span>Note Date: {new Date(note.custNoteDate).toLocaleDateString()}</span>
                                </div>
                                <div className="cust-note-file">
                                    {note.custNoteFiles.map((file, index) => (
                                        <div key={index}>
                                            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="lodn-cont">
                        <div className="loading-spinner"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustNoteCard
