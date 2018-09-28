const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: String,
});

mongoose.model('user', userSchema);