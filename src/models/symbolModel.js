const mongoose = require('mongoose');

const symbolSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Symbol', symbolSchema, 'symbols');
