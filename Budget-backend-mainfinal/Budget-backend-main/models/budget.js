const mongoose = require('mongoose');

const budget = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: false,
    },
    month: {
        type: String,
        required: false,
    },
    userEmail: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: false,
    },
},
    {
        strictQuery: false,
        timestamps: true,
    }
);

module.exports = mongoose.model('Budget', budget, 'budget');