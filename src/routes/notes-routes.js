const { 
    get_note_controller, 
    get_notes_controller, 
    create_notes_controller,
    update_notes_controller,
    delete_note_controller
} = require('../controllers/note-controller');

const routes = (app) => {
    app.get('/notes/:id', get_note_controller);
    app.get('/notes', get_notes_controller);
    app.post('/notes', create_notes_controller);
    app.put('/notes/:id', update_notes_controller);
    app.delete('/notes/:id', delete_note_controller);
}

module.exports = routes;