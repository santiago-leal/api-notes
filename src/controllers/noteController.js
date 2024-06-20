const { getUserService } = require("../services/userService");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");
const {
  getNoteService,
  getNotesService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
} = require("../services/noteService");

const getNoteController = async (req, res) => {
  let { id } = req.params;
  const note = (await getNoteService(id)) || { note: "Note does exist" };
  res.json(note);
};

const getNotesController = async (req, res) => {
  const user_info = await getUserService(req.body.email);
  if (!user_info) {
    res.json({ message: "User does not exist" });
  } else {
    const notes = await getNotesService(user_info._id);
    res.json(notes);
  }
};

const createNotesController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
  } else {
    const user_info = await get_user_service(req.body.email);
    let { title, text_note } = req.body;
    let data = {
      user_id: user_info._id,
      title,
      text_note,
    };
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      data.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      fs.unlinkSync(req.files.image.tempFilePath);
    }
    const note = await createNoteService(data);
    res.json(note);
  }
};

const updateNotesController = async (req, res) => {
  try {
    let { id } = req.params;
    const note = (await updateNoteService(id, req.body)) || {
      message: "Note does not exist",
    };
    res.json(note);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.json({ message: "Invalid id" });
    } else {
      res.json({ message: error.message });
    }
  }
};

const deleteNoteController = async (req, res) => {
  let { id } = req.params;
  const note = (await getNoteService(id)) || {
    message: "Note does not exist",
  };
  if (note.image?.public_id) {
    await deleteImage(note.image.public_id);
  }
  const note_delete = (await deleteNoteService(id)) || {
    message: "Note does not exist",
  };
  res.json(note_delete);
};

module.exports = {
  getNoteController,
  getNotesController,
  createNotesController,
  updateNotesController,
  deleteNoteController,
};
