const mongoose = require("mongoose");

const salesModel = mongoose.Schema(
    {
        saleId: { type: Number, require: true },
        saleTitle: { type: String, require: true },
        saleDiscountInfo: { type: String, require: true },
        saleStartDate: { type: Date, default: new Date() },
        saleEndDate: { type: Date, require: true },
    }, {
    timestamps: true,
});

const SalesRepo = mongoose.model('SalesRepos', salesModel);

module.exports = SalesRepo;