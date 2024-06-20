const Users_model = require("../models/User");

const getUserService = async (email) => {
  try {
    const user = await Users_model.findOne({ email: email });
    return user;
  } catch (error) {
    return { message: error.message };
  }
};

const createUserService = async (data) => {
  try {
    const user = await Users_model(data);
    const user_note = await user.save();
    return user_note;
  } catch (error) {
    return { message: error.message };
  }
};

const updateUserService = async (id, data) => {
  try {
    const user = Users_model.findByIdAndUpdate({ _id: id }, data);
    return user;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getUserService,
  createUserService,
  updateUserService,
};
