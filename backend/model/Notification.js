const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        month: { type: Number, required: false },
        year: { type: Number, required: false }
    },
    type: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notification', notificationSchema);