const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        strictQuery: false,
        timestamps: true,
    }
);

module.exports = mongoose.model('Users', users, 'users');