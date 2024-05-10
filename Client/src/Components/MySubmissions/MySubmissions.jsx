import React, { useState } from 'react'
import './MySubmissions.css'
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const MySubmissions = () => {
    const [orderId, setOrderId] = useState(0);
    const [custName, setCustName] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custPhone, setCustPhone] = useState(0);
    const [custAddress, setCustAddress] = useState('');
    const [orderAmount, setOrderAmount] = useState(0);
    const [orderProducts, setOrderProducts] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [customerImage, setCustomerImage] = useState(null);
    const [customerLicense, setCustomerLicense] = useState(null);

    const { user } = ChatState();

    const handleCustomerImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setCustomerImage(Object.assign(selectedFile, {
                preview: URL.createObjectURL(selectedFile)
            }));
        }
    };

    const handleCustomerLicenseChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setCustomerLicense(Object.assign(selectedFile, {
                preview: URL.createObjectURL(selectedFile)
            }));
        }
    };

    const handleRemoveCustomerImage = () => {
        setCustomerImage(null);
    };

    const handleRemoveCustomerLicense = () => {
        setCustomerLicense(null);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('custName', custName);
        formData.append('custEmail', custEmail);
        formData.append('custPhone', custPhone);
        formData.append('custAddress', custAddress);
        formData.append('orderAmount', orderAmount);
        formData.append('orderProducts', orderProducts);
        formData.append('orderDate', orderDate);

        if (customerImage) {
            formData.append('customerPic', customerImage);
        }
        if (customerLicense) {
            formData.append('customerLicense', customerLicense);
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/mysub/addOrder', formData, config);

            console.log('Order data:', data);

            if (data) {
                window.alert("Order Successfully Created!");
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };


    return (
        <div className='mysub-container'>
            <div className="topset">
                <div className="row1-mysub-header">
                    <h1>MY SUBMISSIONS</h1>
                </div>
                <div className="row2-divider-mysub">
                    <h2>.</h2>
                </div>
            </div>

            <div className="btm-mysub-panel">
                <div className="mysub-btmset">
                    <div className="inp-fm-sec">
                        <label>Order ID</label>
                        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
                    </div>
                    <div className="inp-fm-sec">
                        <label>Customer Name</label>
                        <input type="text" value={custName} onChange={(e) => setCustName(e.target.value)} />
                    </div>
                    <div className="inp-fm-sec">
                        <label>Customer Email</label>
                        <input type="text" value={custEmail} onChange={(e) => setCustEmail(e.target.value)} />
                    </div>
                    <div className="inp-fm-sec">
                        <label>Customer Phone</label>
                        <input type="text" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} />
                    </div>
                    <div className="inp-fm-sec">
                        <label>Customer Address</label>
                        <input type="text" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} />
                    </div>
                    <div className="inp-fm-sec">
                        <label>Order Amount</label>
                        <input type="text" value={orderAmount} onChange={(e) => setOrderAmount(e.target.value)} />
                    </div>
                    <div className="inp-fm-sec">
                        <label>Order Products with Quantities</label>
                        <input type="text" value={orderProducts} onChange={(e) => setOrderProducts(e.target.value)} />
                    </div>
                    <div className="inp-fm-sec">
                        <label>Order Date</label>
                        <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
                    </div>

                    <div className="customerpic-container" id='custpic-cnt1'>
                        <label id='lbl-img'>Customer Image:</label>
                        <div className="pp-input">
                            <label htmlFor="file-upload-customer-image" className="file-upload">
                                Upload File <i className="fa-solid fa-folder"></i>
                            </label>
                            <input
                                id="file-upload-customer-image"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleCustomerImageChange}
                            />
                        </div>
                        <div className="pp-preview">
                            {customerImage && (
                                <div className="pp-thumbnail">
                                    <i onClick={handleRemoveCustomerImage} className="fa-solid fa-circle-xmark pp-close"></i>
                                    <img src={customerImage.preview} alt="Thumbnail" />
                                    <p>{customerImage.name}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="customerpic-container">
                        <label id='lbl-img'>Customer License:</label>
                        <div className="pp-input">
                            <label htmlFor="file-upload-customer-license" className="file-upload">
                                Upload File <i className="fa-solid fa-folder"></i>
                            </label>
                            <input
                                id="file-upload-customer-license"
                                type="file"
                                accept=".png,.jpg,.jpeg,.pdf,.docx"
                                onChange={handleCustomerLicenseChange}
                            />
                        </div>
                        <div className="pp-preview">
                            {customerLicense && (
                                <div className="pp-thumbnail">
                                    <i onClick={handleRemoveCustomerLicense} className="fa-solid fa-circle-xmark pp-close"></i>
                                    <img src={customerLicense.preview} alt="Thumbnail" />
                                    <p>{customerLicense.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="submtbtn-mysb">
                    <button onClick={() => handleSubmit()}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default MySubmissions;
