const mongoose = require("mongoose");

const custnoteModel = mongoose.Schema(
    {
        custNoteId: { type: Number, require: true },
        custNoteTitle: { type: String, require: true },
        custNoteDescription: { type: String, require: true },
        custName: { type: String, require: true },
        custPhone: { type: Number, require: true },
        custNoteFiles: { type: Array },
        custNoteDate: { type: Date, default: new Date() },
    }, {
    timestamps: true,
});

const CustNote = mongoose.model('CustNotes', custnoteModel);

module.exports = CustNote;