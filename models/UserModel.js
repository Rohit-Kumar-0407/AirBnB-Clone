const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['guest', 'host'],
        default: 'guest'
    }
})

module.exports = mongoose.model('User', UserSchema);