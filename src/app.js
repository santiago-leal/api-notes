require('dotenv').config()
require('./utils/database')

const express = require('express');
const routes = require('./routes/routes');
const notes_routes = require('./routes/notes-routes');
const user_routes = require('./routes/users-routes');
const fileUpload = require('express-fileupload');
const validate_token = require('./middleware/validate-token');

const app = express();

// Middleware
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
}));

routes(app);
app.use(validate_token)
notes_routes(app);
user_routes(app);

app.listen(process.env.PORT, () => {
    console.log(`listening at http://localhost:${process.env.PORT}`)
})