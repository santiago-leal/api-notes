const {
    login_controller,
    register_user_controller,
} = require('../controllers/user-controller');

const routes = (app) => {
    // Initial route
    app.get("/", (req, res) => { 
        res.send({message: "connected"});
    });
    app.post('/login', login_controller);
    app.post('/register', register_user_controller);
}

module.exports = routes;