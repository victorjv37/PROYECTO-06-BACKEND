const mongoose = require("mongoose");

const VillageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Especifica nombre de la aldea"],
      unique: true,
      trim: true,
      maxlength: [30, "El nombre no puede tener mas de 30 caracteres"],
    },
    country: {
      type: String,
      required: [true, "Especifica pais"],
      maxlength: [30, "El pais no puede tener mas de 30 caracteres"],
    },
    characters: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Character",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Village", VillageSchema);
