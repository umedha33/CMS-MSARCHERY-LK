const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const Order = require('../models/orderModel');

const addOrder = asyncHandler(async (req, res) => {
    try {
        const { orderId, custName, custEmail, custPhone, custAddress, orderAmount, orderProducts, orderDate, customerPic, customerLicense } = req.body;

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        // const order = await Order.findOne({}).sort({ orderId: -1 });
        // const nextOrderId = order ? order.orderId + 1 : 1;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
            });

            const uploadResults = await Promise.all(uploadPromises);
            taskAttachments = uploadResults.map(result => ({
                fileName: result.original_filename,
                fileUrl: result.secure_url,
            }));
        }

        const newOrder = new Order({
            orderId: orderId,
            custName: custName,
            custEmail: custEmail,
            custPhone: custPhone,
            custAddress: custAddress,
            orderAmount: orderAmount,
            orderProducts: orderProducts,
            orderDate: orderDate,
            customerPic: customerPic,
            customerLicense: customerLicense,
        });

        let createdOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order info added successfully',
            task: createdOrder,
        });
    } catch (error) {
        console.error('Error occurred while creating the task', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = { addOrder };