
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    role: { type: String },
    department: { type: String },
    description: { type: String },
});

module.exports = mongoose.model('Employee', employeeSchema);
