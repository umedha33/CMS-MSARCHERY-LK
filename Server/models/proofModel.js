const mongoose = require("mongoose");

const proofModel = mongoose.Schema(
    {
        proofId: { type: Number, require: true },
        proofTitle: { type: String, require: true },
        proofAttachments: { type: Array },
    }, {
    timestamps: true,
});

const Proof = mongoose.model('Proofs', proofModel);

module.exports = Proof;