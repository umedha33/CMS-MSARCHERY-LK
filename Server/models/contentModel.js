const mongoose = require("mongoose");

const contentModel = mongoose.Schema(
    {
        contentId: { type: Number, require: true },
        contentTitle: { type: String, require: true },
        contentAttachments: { type: Array },
    }, {
    timestamps: true,
});

const Content = mongoose.model('Contents', contentModel);

module.exports = Content;