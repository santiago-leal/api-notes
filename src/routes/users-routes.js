const {
    login_controller,
    register_user_controller,
    get_user_controller,
    update_user_controller
} = require('../controllers/user-controller');

const routes = (app) => {
    // Login and Register
    app.post('/login', login_controller);
    app.post('/register', register_user_controller);

    app.get('/user', get_user_controller);
    app.put('/user', update_user_controller)
}

module.exports = routes;