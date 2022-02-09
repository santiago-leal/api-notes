const Notes_model = require('../models/Note');

const get_note_service = async (id) => {
    try {
        const note = await Notes_model.findById(id);
        return note
    } catch (error) {
        return error.message;
    }
}

const get_notes_service = async () => {
    try {
        const notes = await Notes_model.find().lean();
        return notes;
    } catch (error) {
        return {
            message: error.message
        };
    }
}

const create_note_service = async (data) => {
    try {
        const note = Notes_model(data);
        const note_save = await note.save();
        return note_save;
    } catch (error) {
        return {message: error.message};
    }
}

const update_task_service = async (id, data) => {
    try {
        const note = Notes_model.updateOne({_id: id}, data);
        return note;
    } catch (error) {
        return {message: error.message};
    }
}

module.exports = {
    get_note_service,
    get_notes_service,
    create_note_service,
    update_task_service
}