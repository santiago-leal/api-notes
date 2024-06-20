const { Schema, model, isValidObjectId, Mongoose } = require("mongoose");
const User = require("./User");

const noteSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es requerido"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
      trim: true,
    },
    text_note: {
      type: String,
      required: [true, "El texto es requerido"],
      trim: true,
    },
    image: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Note", noteSchema);
