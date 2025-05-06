const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characters");

router.route("/").get(getCharacters).post(createCharacter);

router
  .route("/:id")
  .get(getCharacter)
  .put(updateCharacter)
  .delete(deleteCharacter);

module.exports = router;
