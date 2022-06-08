const {
    login_controller,
    register_user_controller,
    get_user_controller,
    update_user_controller
} = require('../controllers/user-controller');

const { 
    get_note_controller, 
    get_notes_controller, 
    create_note_controller,
    update_task_controller
} = require('../controllers/note-controller');

const routes = (app, validate_token) => {
    // Initial Route
    app.get('/', (req, res) => {
        res.send({message: "connected"});
    });
    // Login and Register
    app.post('/login', login_controller);
    app.post('/register', register_user_controller);
    
    // Routes Users
    app.get('/user', /*validate_token,*/ get_user_controller);
    app.put('/user', /*validate_token,*/ update_user_controller)
    // Routes Notes
    app.get('/note/:id', /*validate_token,*/ get_note_controller);
    app.get('/note', /*validate_token,*/ get_notes_controller);
    app.post('/note', /*validate_token,*/ create_note_controller);
    app.put('/note/:id', /*validate_token,*/ update_task_controller);
}

module.exports = routes;