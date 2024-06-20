const Notes_model = require("../models/Note");

const getNoteService = async (id) => {
  try {
    const note = await Notes_model.findById(id);
    return note;
  } catch (error) {
    if (error.kind === "ObjectId") {
      return { message: "Invalid id" };
    }
    return { message: error.message };
  }
};

const getNotesService = async (user_id) => {
  try {
    const notes = await Notes_model.find({ user_id: user_id });
    return notes;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

const createNoteService = async (data) => {
  try {
    const note = Notes_model(data);
    const note_save = await note.save();
    return note_save;
  } catch (error) {
    return { message: error.message };
  }
};

const updateNoteService = async (id, data) => {
  try {
    const note = Notes_model.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    return note;
  } catch (error) {
    if (error.kind === "ObjectId") {
      return { message: "Invalid id" };
    }
    return { message: error.message };
  }
};

const deleteNoteService = async (id) => {
  try {
    const note = Notes_model.findByIdAndDelete(id);
    return note;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getNoteService,
  getNotesService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
};
