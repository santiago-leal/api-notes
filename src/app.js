require('dotenv').config()
require('./utils/database')

const express = require('express');
const notes_routes = require('./routes/notes-routes');
const user_routes = require('./routes/users-routes');
const validate_token = require('./middleware/middleware');

const app = express();

// Initial route
app.get("/", (req, res) => { 
    res.send({message: "connected"});
});

// Middleware
app.use(express.json())
// app.use(validate_token)

notes_routes(app);
user_routes(app);

app.listen(process.env.PORT, () => {
    console.log(`listening at http://localhost:${process.env.PORT}`)
})