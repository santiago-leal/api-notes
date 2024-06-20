require("dotenv").config();
require("./utils/database");

const express = require("express");
const fileUpload = require("express-fileupload");
const validateToken = require("./middleware/validateToken");
const { router, notesRouter, userRouter } = require("./routes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/uploads",
  })
);

app.use("/", router);
app.use(validateToken);
app.use("/notes", notesRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`);
});
