import React, { useEffect, useState } from 'react'
import './ProofsCard.css'
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const ProofsCard = () => {
    const [loading, setLoading] = useState(false);
    const [proofs, setProofs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProof, setSelectedProof] = useState(null);
    const { user } = ChatState();

    const fetchProof = async () => {
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.get('/api/mysub/fetchProof', config);

            if (data) {
                console.log('All proof data:', data.proofs);
                setProofs(data.proofs);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };

    useEffect(() => {
        fetchProof();
    }, [])

    const handleCardClick = (content, attachment) => {
        setSelectedProof({ ...content, attachment });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedProof(null);
    };

    return (
        <div className='proof-card-container'>
            <div className="crd-hdr-contn">
                <h2>Received Proof</h2>
            </div>
            <div className="cntnt-itms-panl">
                {!loading ? (
                    <div className="cntnt-itms-panl24">
                        {proofs.map((proof, idx) => (
                            proof.proofAttachments.map((attachment, attIdx) => {
                                const isImage = /\.(jpg|jpeg|png|gif)$/.test(attachment.fileUrl);
                                return (
                                    <div className="proof-card" key={`${idx}-${attIdx}`} onClick={() => handleCardClick(proof, attachment)}>
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
                    <div className="lodn-proof">
                        <div className="loading-spinner"></div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 id='mdl-hdr'>Proof Details</h2>
                        {selectedProof && (
                            <div className="modal-details121">
                                <p><strong>Task Title:</strong> {selectedProof.proofTitle}</p>
                                <p><strong>File Name:</strong> {selectedProof.attachment.fileName}</p>
                                <p><strong>Created Date:</strong> {new Date(selectedProof.createdAt).toLocaleDateString()}</p>
                                <p><strong>File Url:</strong>
                                    <div className='files-modl23'>
                                        <p>
                                            <a href={selectedProof.attachment.fileUrl}>{selectedProof.attachment.fileUrl}</a>
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

export default ProofsCard
