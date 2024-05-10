import React, { useState } from 'react'
import './SalesSubmit.css'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';

const SalesSubmit = () => {
    const [saleTitle, setSaleTitle] = useState('');
    const [saleDiscountInfo, setSaleDiscountInfo] = useState('');
    const [saleEndDate, setSaleEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = ChatState();

    const handleSubmit = async () => {
        setLoading(true);

        if (!saleTitle || !saleDiscountInfo || !saleEndDate) {
            window.alert("Please fill required feilds!")
            return
        }

        const formData = {
            saleTitle: saleTitle,
            saleDiscountInfo: saleDiscountInfo,
            saleEndDate: saleEndDate,
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('/api/mysub/addSale', formData, config);

            console.log('Sale data:', data);

            if (data) {
                window.alert("Sale Successfully Created!");
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting the sale:', error);
        }
    };

    return (
        <div className="btm-mysub-panel">
            <div className="mysub-btmset">
                <div className="inp-fm-sec">
                    <label>Sale Title</label>
                    <input type="text" value={saleTitle} onChange={(e) => setSaleTitle(e.target.value)} placeholder='Enter A Unique Title For The Sale' />
                </div>
                <div className="inp-fm-sec">
                    <label>Sale End Date:</label>
                    <input type="date" value={saleEndDate} onChange={(e) => setSaleEndDate(e.target.value)} />
                </div>
            </div>
            <div className="dsc-exp-dv">
                <div className="inp-fm-sec333">
                    <label>Sale Information</label>
                    <textarea id='txtar-expns' value={saleDiscountInfo} onChange={(e) => setSaleDiscountInfo(e.target.value)} placeholder='Provide Well Detailed Description About The Introduced Sale'></textarea>
                </div>
            </div>

            <div className="submtbtn-mysb">
                <button onClick={() => handleSubmit()} disabled={loading}>
                    {loading ? <div className="spinner1"></div> : 'SUBMIT'}
                </button>
            </div>
        </div>
    )
}

export default SalesSubmit
