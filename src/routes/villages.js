const express = require("express");
const router = express.Router();

const {
  getVillages,
  getVillage,
  createVillage,
  updateVillage,
  deleteVillage,
} = require("../controllers/villages");

const characterRouter = require("./characters");

router.use("/:villageId/characters", characterRouter);

router.route("/").get(getVillages).post(createVillage);

router.route("/:id").get(getVillage).put(updateVillage).delete(deleteVillage);

module.exports = router;
