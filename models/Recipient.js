const mongoose = require('mongoose');

const recipientSchema = mongoose.Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;