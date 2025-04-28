const express = require('express');
const {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter
} = require('../controllers/characters');

// We need mergeParams: true to access :villageId from the parent router (villages.js)
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getCharacters) // Handles both /characters and /villages/:villageId/characters
  .post(createCharacter); // Only handles /villages/:villageId/characters

router
  .route('/:id')
  .get(getCharacter)
  .put(updateCharacter)
  .delete(deleteCharacter);

module.exports = router; 