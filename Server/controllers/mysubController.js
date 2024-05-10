const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const Order = require('../models/orderModel');
const Content = require('../models/contentModel');
const Proof = require('../models/proofModel');
const Expenses = require('../models/expensesModel');
const CustNote = require('../models/custnoteModel');
const SalesRepo = require('../models/salesModel');

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

const addProof = asyncHandler(async (req, res) => {
    try {
        const { proofId, proofTitle } = req.body;
        let proofAttachments = [];

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const proof = await Proof.findOne({}).sort({ proofId: -1 });
        const nextProofId = proof ? proof.proofId + 1 : 1;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
            });

            const uploadResults = await Promise.all(uploadPromises);
            proofAttachments = uploadResults.map(result => ({
                fileName: result.original_filename,
                fileUrl: result.secure_url,
            }));
        }

        const newProof = new Proof({
            proofId: nextProofId,
            proofTitle: proofTitle,
            proofAttachments: proofAttachments,
        });

        let createdProof = await newProof.save();

        res.status(201).json({
            message: 'Proof created successfully',
            proof: createdProof,
        });
    } catch (error) {
        console.error('Error occurred while creating the proof', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

const addExpense = asyncHandler(async (req, res) => {
    try {
        const { expTitle, expDescription, expAmount } = req.body;

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const expense = await Expenses.findOne({}).sort({ expId: -1 });
        const nextExpenseId = expense ? expense.expId + 1 : 1;

        const newExpense = new Expenses({
            expId: nextExpenseId,
            expTitle: expTitle,
            expDescription: expDescription,
            expAmount: expAmount,
        });

        const createdExpense = await newExpense.save();

        res.status(201).json({
            message: 'Expense info added successfully',
            expense: createdExpense,
        });
    } catch (error) {
        console.error('Error occurred while creating the expense', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

const addCustNote = asyncHandler(async (req, res) => {
    try {
        const { custNoteTitle, custNoteDescription, custName, custPhone, custNoteDate } = req.body;
        let custNoteFiles = [];

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const custnote = await CustNote.findOne({}).sort({ custNoteId: -1 });
        const nextCustNoteId = custnote ? custnote.custNoteId + 1 : 1;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
            });

            const uploadResults = await Promise.all(uploadPromises);
            custNoteFiles = uploadResults.map(result => ({
                fileName: result.original_filename,
                fileUrl: result.secure_url,
            }));
        }

        const newCustNote = new CustNote({
            custNoteId: nextCustNoteId,
            custNoteTitle: custNoteTitle,
            custNoteDescription: custNoteDescription,
            custName: custName,
            custPhone: custPhone,
            custNoteFiles: custNoteFiles,
            custNoteDate: custNoteDate,
        });

        let createdCustNote = await newCustNote.save();

        res.status(201).json({
            message: 'Cust note created successfully',
            custnote: createdCustNote,
        });
    } catch (error) {
        console.error('Error occurred while creating the cust note', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

const addSale = asyncHandler(async (req, res) => {
    try {
        const { saleTitle, saleDiscountInfo, saleEndDate } = req.body;

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const sale = await SalesRepo.findOne({}).sort({ saleId: -1 });
        const nextSaleId = sale ? sale.saleId + 1 : 1;

        const newSale = new SalesRepo({
            saleId: nextSaleId,
            saleTitle: saleTitle,
            saleDiscountInfo: saleDiscountInfo,
            saleEndDate: saleEndDate,
        });

        const createdSale = await newSale.save();

        res.status(201).json({
            message: 'Sale info added successfully',
            sale: createdSale,
        });
    } catch (error) {
        console.error('Error occurred while creating the sale', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


const getAllContent = asyncHandler(async (req, res) => {
    try {

        if (!req.user) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const contents = await Content.find({});

        if (contents.length === 0) {
            res.status(404).json({
                message: 'No content found',
            });
        } else {
            res.status(200).json({
                message: 'Contents retrieved successfully',
                count: contents.length,
                contents: contents,
            });
        }
    } catch (error) {
        console.error('Error occurred while fetching the content', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

const getAllProof = asyncHandler(async (req, res) => {
    try {

        if (!req.user) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const proofs = await Proof.find({});

        if (proofs.length === 0) {
            res.status(404).json({
                message: 'No proofs found',
            });
        } else {
            res.status(200).json({
                message: 'Proofs retrieved successfully',
                count: proofs.length,
                proofs: proofs,
            });
        }
    } catch (error) {
        console.error('Error occurred while fetching the proof', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    try {

        if (!req.user) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const orders = await Order.find({});

        if (orders.length === 0) {
            res.status(404).json({
                message: 'No orders found',
            });
        } else {
            res.status(200).json({
                message: 'Orders retrieved successfully',
                count: orders.length,
                order: orders,
            });
        }
    } catch (error) {
        console.error('Error occurred while fetching the orders', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});

module.exports = { addOrder, addContent, addProof, addExpense, addCustNote, addSale, getAllContent, getAllProof, getAllOrders };