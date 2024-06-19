const {
  get_user_controller,
  update_user_controller,
} = require("../controllers/user-controller");

const routes = (app) => {
  app.get("/user", get_user_controller);
  app.put("/user", update_user_controller);
};

module.exports = routes;
