const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Especifica nombre"],
    unique: true,
    trim: true,
    maxlength: [30, "El nombre no puede tener mas de 30 caracteres"],
  },
  rank: {
    type: Number,
    required: [true, "Especifica rango"],
    enum: [
      "Estudiante",
      "Genin",
      "Chunin",
      "Jonin",
      "Anbu",
      "Sannin",
      "Kage",
      "Otro",
    ],
  },
  clan: {
    type: String,
    trim: true,
    maxlength: [30, "El clan no puede tener mas de 30 caracteres"],
  },
  village: {
    type: mongoose.Schema.ObjectId,
    ref: "Village",
    required: [true, "Especifica una aldea"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
