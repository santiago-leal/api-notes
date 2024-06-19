const Users_model = require("../models/User");

const get_user_service = async (email) => {
  try {
    const user = await Users_model.findOne({ email: email });
    return user;
  } catch (error) {
    return { message: error.message };
  }
};

const create_user_service = async (data) => {
  try {
    const user = await Users_model(data);
    const user_note = await user.save();
    return user_note;
  } catch (error) {
    return { message: error.message };
  }
};

const update_user_service = async (id, data) => {
  try {
    const user = Users_model.findByIdAndUpdate({ _id: id }, data);
    return user;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  get_user_service,
  create_user_service,
  update_user_service,
};
