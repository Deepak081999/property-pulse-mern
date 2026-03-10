const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: [true, 'Email already exists'],
            required: [true, 'Email is required'],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        image: {
            type: String,
        },
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Property',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);