const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const Order = require('../models/orderModel');
const Content = require('../models/taskModel');

const addOrder = asyncHandler(async (req, res) => {
    try {
        const { orderId, custName, custEmail, custPhone, custAddress, orderAmount, orderProducts, orderDate } = req.body;

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        let customerPicUrl = null;
        let customerPicName = null;
        let customerLicenseUrl = null;
        let customerLicenseName = null;

        if (req.files['customerPic']) {
            const customerPic = req.files['customerPic'][0];
            const customerPicUpload = await cloudinary.uploader.upload(customerPic.path, { resource_type: 'image' });
            customerPicUrl = customerPicUpload.secure_url;
            customerPicName = customerPic.originalname;
        }

        if (req.files['customerLicense']) {
            const customerLicense = req.files['customerLicense'][0];
            const customerLicenseUpload = await cloudinary.uploader.upload(customerLicense.path, { resource_type: 'image' });
            customerLicenseUrl = customerLicenseUpload.secure_url;
            customerLicenseName = customerLicense.originalname;
        }

        const newOrder = new Order({
            orderId,
            custName,
            custEmail,
            custPhone,
            custAddress,
            orderAmount,
            orderProducts,
            orderDate,
            customerPic: { url: customerPicUrl, name: customerPicName },
            customerLicense: { url: customerLicenseUrl, name: customerLicenseName },
        });

        const createdOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order info added successfully',
            order: createdOrder,
        });
    } catch (error) {
        console.error('Error occurred while creating the order', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

const addContent = asyncHandler(async (req, res) => {
    try {
        const { contentId, contentTitle } = req.body;
        let contentAttachments = [];

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const content = await Content.findOne({}).sort({ contentId: -1 });
        const nextContentId = content ? content.contentId + 1 : 1;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
            });

            const uploadResults = await Promise.all(uploadPromises);
            contentAttachments = uploadResults.map(result => ({
                fileName: result.original_filename,
                fileUrl: result.secure_url,
            }));
        }

        const newContent = new Content({
            contentId: nextContentId,
            contentTitle: contentTitle,
            contentAttachments: contentAttachments,
        });

        let createdContent = await newContent.save();

        res.status(201).json({
            message: 'Content created successfully',
            content: createdContent,
        });
    } catch (error) {
        console.error('Error occurred while creating the content', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = { addOrder, addContent };