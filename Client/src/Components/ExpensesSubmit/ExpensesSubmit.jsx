import React, { useState } from 'react'
import './ExpensesSubmit.css'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';

const ExpensesSubmit = () => {
    const [expTitle, setExpTitle] = useState('');
    const [expDescription, setExpDescription] = useState('');
    const [expAmount, setExpAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = ChatState();

    const handleSubmit = async () => {
        setLoading(true);

        if (!expTitle || !expDescription || !expAmount) {
            window.alert("Please fill required feilds!")
            return
        }

        const formData = {
            expTitle: expTitle,
            expDescription: expDescription,
            expAmount: expAmount,
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('/api/mysub/addExpense', formData, config);

            console.log('Expense data:', data);

            if (data) {
                window.alert("Expense Successfully Created!");
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting the expense:', error);
        }
    };

    return (
        <div className="btm-mysub-panel">
            <div className="mysub-btmset">
                <div className="inp-fm-sec">
                    <label>Expense Title</label>
                    <input type="text" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} placeholder='Enter A Unique Title For The Expense' />
                </div>
                <div className="inp-fm-sec">
                    <label>Expense Amount: LKR</label>
                    <input type="text" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} placeholder='Enter The Amount Of The Expense' />
                </div>
            </div>
            <div className="dsc-exp-dv">
                <div className="inp-fm-sec333">
                    <label>Expense Description</label>
                    <textarea id='txtar-expns' value={expDescription} onChange={(e) => setExpDescription(e.target.value)} placeholder='Provide Well Detailed Description About The Expense'></textarea>
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

export default ExpensesSubmit
