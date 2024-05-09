const mongoose = require("mongoose");

const orderModel = mongoose.Schema({
    orderId: { type: Number, require: true },
    custName: { type: String, require: true },
    custEmail: { type: String },
    custPhone: { type: String },
    custAddress: { type: String },
    orderAmount: { type: Number },
    orderProducts: { type: String },
    orderDate: { type: Date },
    customerPic: { type: String },
    customerLicense: { type: String },
}, {
    timestamps: true,
});

const Order = mongoose.model('Orders', orderModel);

module.exports = Order;