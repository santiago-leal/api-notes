const jwt = require('jsonwebtoken');
const express = require('express');

const validate_token = express.Router();
validate_token.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
                return res.json({message: 'Invalid Token'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            message: 'Token is required'
        })
    }
});

module.exports = validate_token;