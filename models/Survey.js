const mongoose = require('mongoose');

const RecipientSchema = require('./Recipient');

const surveySchema = mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    dateSent: Date,
    lastResponded: Date,
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('survey', surveySchema);