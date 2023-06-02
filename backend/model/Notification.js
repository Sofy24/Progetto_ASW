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
    category: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    money: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Notification', notificationSchema);