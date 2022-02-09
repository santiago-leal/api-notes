const { Schema, model } = require('mongoose');

const note_schema = new Schema({
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
    url_image: String,
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('Note', note_schema);