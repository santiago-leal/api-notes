require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  getUserService,
  createUserService,
  updateUserService,
} = require("../services/userService");

const registerUserController = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user = await createUserService(req.body);
  res.json(user);
};

const loginController = async (req, res) => {
  let { email, password } = req.body;
  let user = await getUserService(email);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const payload = {
        check: true,
      };

      const token = jwt.sign(payload, process.env.KEY, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      });
      res.json({
        message: "Autenticación correcta",
        token,
      });
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  } else {
    res.json({ mensaje: "El usuario no existe" });
  }
};

const updateUserController = async (req, res) => {
  let { email } = req.body;
  const user = await getUserService(email);
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user_update = await updateUserService(user._id, req.body);
  res.json(user_update);
};

const getUserController = async (req, res) => {
  let { email } = req.query;
  const user = await getUserService(email);
  res.json(user);
};

module.exports = {
  loginController,
  registerUserController,
  getUserController,
  updateUserController,
};
