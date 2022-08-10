const { 
    get_note_controller, 
    get_notes_controller, 
    create_note_controller,
    update_task_controller
} = require('../controllers/note-controller');

const routes = (app) => {
    app.get('/notes/:id', get_note_controller);
    app.get('/notes', get_notes_controller);
    app.post('/notes', create_note_controller);
    app.put('/notes/:id', update_task_controller);
}

module.exports = routes;