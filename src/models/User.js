const { Schema, model } = require('mongoose');

const user_schema = new Schema({
    user_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('User', user_schema);