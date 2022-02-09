require('dotenv').config()

const jwt = require('jsonwebtoken');

const { 
    get_user_service, 
    create_user_service, 
    update_user_service
} = require('../services/user-service');

const login_controller = (req, res) => {
    let { user_name, password } = req.body;
    if(user_name == 'santiago' && password == '123456') {
        const payload = {
            check: true
        };

        const token = jwt.sign(payload, process.env.KEY, {
            expiresIn: 1440
        });
        res.json({
            message: 'Autenticación correcta',
            token
        })
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
}

const get_user_controller = async (req, res) => {
    let { email } = req.query;
    const user = await get_user_service(email);
    res.send(user);
}

const create_user_controller = async (req, res) => {
    const user = await create_user_service(req.body);
    res.send(user);
}

const update_user_controller = async (req, res) => {
    let { email } = req.body;
    const user = await get_user_service(email);
    const user_update = await update_user_service(user._id, req.body);
    res.send(user_update)
}

module.exports = {
    login_controller,
    get_user_controller,
    create_user_controller,
    update_user_controller
}