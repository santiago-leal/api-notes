const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

const saltRounds = 10;
const user_schema = new Schema({
    user_name: {
        type: String,
        unique: true,
        required: [true, "El nombre de usuario es requerido"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es requerido"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

user_schema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

module.exports = model('User', user_schema);