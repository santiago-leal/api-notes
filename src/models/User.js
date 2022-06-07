const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

const saltRounds = 10;
const user_schema = new Schema({
    user_name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

// user_schema.pre('save', function(next) {
//     if (this.isNew || this.isModified('password')) {
//         const document = this;
//         bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
//             if (err){
//                 next(err);
//             } else {
//                 document.password = hashedPassword;
//                 next();
//             }
//         });

//     } else {
//         next();
//     }
// });

module.exports = model('User', user_schema);