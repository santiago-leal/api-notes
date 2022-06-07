const { 
    get_note_service, 
    get_notes_service, 
    create_note_service, 
    update_task_service
} = require('../services/note-service');

const { get_user_service } = require('../services/user-service');

const get_note_controller = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const note = await get_note_service(id) || {note: "Note does exist"};
    res.send(note);
}

const get_notes_controller = async (req, res) => {
    const user_info = await get_user_service(req.body.email);
    const notes = await get_notes_service(user_info._id);
    res.send(notes);
}

const create_note_controller = async (req, res) => {
    const user_info = await get_user_service(req.body.email);
    let { title, text_note, url_image } = req.body
    let data = {
        user_id: user_info._id,
        title,
        text_note,
        url_image
    }
    const note = await create_note_service(data);
    res.send(note);
}

const update_task_controller = async (req, res) => {
    let { id } = req.params;
    const note = await update_task_service(id, req.body);
    res.send(note);
}

module.exports = {
    get_note_controller,
    get_notes_controller,
    create_note_controller,
    update_task_controller
}