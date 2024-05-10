const mongoose = require("mongoose");

const expensesModel = mongoose.Schema(
    {
        expId: { type: Number, require: true },
        expTitle: { type: String, require: true },
        expDescription: { type: String, require: true },
        expAmount: { type: Number, require: true },
        expDate: { type: Date, default: new Date() },
    }, {
    timestamps: true,
});

const Expenses = mongoose.model('Expenses', expensesModel);

module.exports = Expenses;