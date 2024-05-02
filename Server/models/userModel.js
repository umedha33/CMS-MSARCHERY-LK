const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String },
    role: { type: String },
    schedules: { type: Object, default: { scd: "abc" } },
    userActive: { type: Boolean, default: false },
    password: { type: String, require: true },
    pic: {
        type: String, default:
            "https://cdn-icons-png.freepik.com/256/10302/10302971.png?semt=ais_hybrid"
    },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

module.exports = User;
