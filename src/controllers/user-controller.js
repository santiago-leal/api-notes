require('dotenv').config()

const jwt = require('jsonwebtoken');

const { 
    get_user_service, 
    create_user_service, 
    update_user_service
} = require('../services/user-service');

const register_user_controller = async (req, res) => {
    const user = await create_user_service(req.body);
    res.json(user);
}

const login_controller = async (req, res) => {
    let { email, password} = req.body;
    let user = await get_user_service(email);
    if(user) {
        if (email == user.email && password==user.password) {
            const payload = {
                check: true
            };
    
            const token = jwt.sign(payload, process.env.KEY, {
                expiresIn: process.env.EXPIRATION_TOKEN
            });
            res.json({
                message: 'Autenticación correcta',
                token
            })
        } else {
            res.json({ mensaje: "Usuario o contraseña incorrectos"})
        }
    } else {
        res.json({mensaje: "El usuario no existe"})
    }
}

const update_user_controller = async (req, res) => {
    let { email } = req.body;
    const user = await get_user_service(email);
    const user_update = await update_user_service(user._id, req.body);
    res.json(user_update)
}

const get_user_controller = async (req, res) => {
    let { email } = req.query;
    const user = await get_user_service(email);
    res.json(user);
}

module.exports = {
    login_controller,
    register_user_controller,
    get_user_controller,
    update_user_controller
}