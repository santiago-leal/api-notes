const { get_user_service } = require('../services/user-service');
const { uploadImage, deleteImage } = require('../utils/cloudinary');
const fs = require('fs');
const { 
    get_note_service, 
    get_notes_service, 
    create_note_service, 
    update_note_service,
    delete_note_service
} = require('../services/note-service');

const get_note_controller = async (req, res) => {
    let { id } = req.params;
    const note = await get_note_service(id) || {note: "Note does exist"};
    res.json(note);
}

const get_notes_controller = async (req, res) => {
    console.log(req.body.email);
    const user_info = await get_user_service(req.body.email);
    if (!user_info) {
        res.json({"message": "User does not exist"});
    } else {
        const notes = await get_notes_service(user_info._id);
        res.json(notes);
    }
}

const create_notes_controller = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({"message": "Email is required"});
    } else {
        const user_info = await get_user_service(req.body.email);
        let { title, text_note } = req.body
        let data = {
            user_id: user_info._id,
            title,
            text_note,
        }
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            data.image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            fs.unlinkSync(req.files.image.tempFilePath);
        }
        const note = await create_note_service(data);
        res.json(note);
    }
}

const update_notes_controller = async (req, res) => {
    try {
        let { id } = req.params;
        const note = await update_note_service(id, req.body) || {message: "Note does not exist"};
        res.json(note);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            res.json({message: 'Invalid id'});
        } else {
            res.json({message: error.message});
        }
    }
}

const delete_note_controller = async (req, res) => {
    let { id } = req.params;
    const note = await get_note_service(id) || {message: "Note does not exist"};
    if (note.image?.public_id) {
        await deleteImage(note.image.public_id);
    }
    const note_delete = await delete_note_service(id) || {message: "Note does not exist"};
    res.json(note_delete);
}

module.exports = {
    get_note_controller,
    get_notes_controller,
    create_notes_controller,
    update_notes_controller,
    delete_note_controller
}