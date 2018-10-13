const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('user', userSchema);