const { get_user_service } = require('../services/user-service');
const { uploadImage, deleteImage } = require('../utils/cloudinary');
const fs = require('fs');
const { 
    get_note_service, 
    get_notes_service, 
    create_note_service, 
    update_task_service,
    delete_note_service
} = require('../services/note-service');

const get_note_controller = async (req, res) => {
    let { id } = req.params;
    const note = await get_note_service(id) || {note: "Note does exist"};
    res.send(note);
}

const get_notes_controller = async (req, res) => {
    const user_info = await get_user_service(req.body.email);
    const notes = await get_notes_service(user_info._id);
    res.send(notes);
}

const create_notes_controller = async (req, res) => {
    const user_info = await get_user_service(req.body.email);
    const result = await uploadImage(req.files.image.tempFilePath);
    let { title, text_note } = req.body
    let data = {
        user_id: user_info._id,
        title,
        text_note,
        image: {
            url: result.secure_url,
            public_id: result.public_id
        }
    }
    const note = await create_note_service(data);
    fs.unlinkSync(req.files.image.tempFilePath);
    res.send(note);
}

const update_notes_controller = async (req, res) => {
    let { id } = req.params;
    const note = await update_task_service(id, req.body);
    res.send(note);
}

const delete_note_controller = async (req, res) => {
    let { id } = req.params;
    const note = await get_note_service(id);
    await deleteImage(note.image.public_id);
    const note_delete = await delete_note_service(id);
    res.send(note_delete);
}

module.exports = {
    get_note_controller,
    get_notes_controller,
    create_notes_controller,
    update_notes_controller,
    delete_note_controller
}