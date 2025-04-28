const express = require('express');
const {
  getVillages,
  getVillage,
  createVillage,
  updateVillage,
  deleteVillage
} = require('../controllers/villages');

// Include other resource routers
const characterRouter = require('./characters');

const router = express.Router();

// Re-route into other resource routers
// Anything that comes to /api/v1/villages/:villageId/characters will be forwarded to characterRouter
router.use('/:villageId/characters', characterRouter);

router
  .route('/')
  .get(getVillages)
  .post(createVillage);

router
  .route('/:id')
  .get(getVillage)
  .put(updateVillage)
  .delete(deleteVillage);

module.exports = router; 