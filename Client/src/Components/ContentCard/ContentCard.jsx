import React, { useEffect, useState } from 'react'
import './ContentCard.css'
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const ContentCard = () => {
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
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

            const { data } = await axios.get('/api/mysub/fetchContent', config);

            if (data) {
                console.log('All content data:', data.contents);
                setContents(data.contents);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };

    useEffect(() => {
        fetchContent();
    }, [])

    const handleCardClick = (content, attachment) => {
        setSelectedContent({ ...content, attachment });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedContent(null);
    };

    return (
        <div className='contnt-card-container'>
            <div className="crd-hdr-contn">
                <h2>Received Content</h2>
            </div>
            <div className="cntnt-itms-panl">
                {!loading ? (
                    <div className="cntnt-itms-panl2">
                        {contents.map((cont, idx) => (
                            cont.contentAttachments.map((attachment, attIdx) => {
                                const isImage = /\.(jpg|jpeg|png|gif)$/.test(attachment.fileUrl);
                                return (
                                    <div className="cont-card" key={`${idx}-${attIdx}`} onClick={() => handleCardClick(cont, attachment)}>
                                        {isImage ? (
                                            <img src={attachment.fileUrl} alt={attachment.fileName} />
                                        ) : (
                                            <div className="file-placeholder">
                                                <i className="fa-solid fa-file-pdf"></i>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ))}
                    </div>
                ) : (
                    <div className="lodn-cont">
                        <div className="loading-spinner"></div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 id='mdl-hdr'>Content Details</h2>
                        {selectedContent && (
                            <div className="modal-details121">
                                <p><strong>Task Title:</strong> {selectedContent.contentTitle}</p>
                                <p><strong>File Name:</strong> {selectedContent.attachment.fileName}</p>
                                <p><strong>Created Date:</strong> {new Date(selectedContent.createdAt).toLocaleDateString()}</p>
                                <p><strong>File Url:</strong>
                                    <div className='files-modl23'>
                                        <p>
                                            <a href={selectedContent.attachment.fileUrl}>{selectedContent.attachment.fileUrl}</a>
                                        </p>
                                    </div>
                                </p>

                                <div className="modal-actions">
                                    <button id='cls-mdl-cntntcard' onClick={handleClose}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContentCard
