const {
  getNoteController,
  getNotesController,
  createNotesController,
  updateNotesController,
  deleteNoteController,
} = require("../controllers/noteController");
const express = require("express");

const router = express.Router();

router.get("/:id", getNoteController);
router.get("", getNotesController);
router.post("", createNotesController);
router.put("/:id", updateNotesController);
router.delete("/:id", deleteNoteController);

module.exports = router;
