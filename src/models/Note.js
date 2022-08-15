const { Schema, model, isValidObjectId, Mongoose } = require('mongoose');
const User = require('./User');

const note_schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    text_note: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        public_id: String,
        url: String,
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('Note', note_schema);