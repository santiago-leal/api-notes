require('dotenv').config()
require('./database')

const express = require('express');
const body_parser = require('body-parser');
const routes = require('./src/routes/routes');
const validate_token = require('./src/middleware/middleware');

const app = express();

// Middleware
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json())

routes(app, validate_token);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})