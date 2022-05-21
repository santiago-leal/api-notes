require('dotenv').config()

const jwt = require('jsonwebtoken');

const { 
    get_user_service, 
    create_user_service, 
    update_user_service
} = require('../services/user-service');

const register_user_controller = async (req, res) => {
    const user = await create_user_service(req.body);
    res.send({message: 'Usuario registrado exitosamente'});
}

const login_controller = async (req, res) => {
    let { email, user_name, password} = req.body;
    let user = await get_user_service(email);
    console.log(user);
    if(user) {
        const payload = {
            check: true
        };

        const token = jwt.sign(payload, process.env.KEY, {
            expiresIn: 1445
        });
        res.json({
            message: 'Autenticación correctas',
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
    register_user_controller,
    get_user_controller,
    create_user_controller,
    update_user_controller
}