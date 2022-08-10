require('dotenv').config()
require('./database')

const express = require('express');
const notes_routes = require('./src/routes/notes-routes');
const user_routes = require('./src/routes/users-routes');
const validate_token = require('./src/middleware/middleware');

const app = express();

// Initial route
app.get("/", (req, res) => { 
    res.send({message: "connected"});
});

// Middleware
app.use(express.json())
app.use(validate_token)

notes_routes(app);
user_routes(app);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})