const mongoose = require('mongoose');

const RecipientSchema = require('./Recipient');

const surveySchema = mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    positive: { type: Number, default: 0 },
    negative: { type: Number, default: 0 },
    DateSent: Date,
    lastResponded: Date,
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('survey', surveySchema);