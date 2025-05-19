const Character = require("../models/Character");
const Village = require("../models/Village");

//GET de todos los personajes
exports.getCharacters = async (req, res, next) => {
  try {
    let query = {};

    if (req.params.villageId) {
      query = { village: req.params.villageId };
    }

    const characters = await Character.find(query).populate({
      path: "village",
      select: "name country",
    });

    res
      .status(200)
      .json({ success: true, count: characters.length, data: characters });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//GET de un personaje
exports.getCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id).populate({
      path: "village",
      select: "name country",
    });

    if (!character) {
      return res.status(404).json({
        success: false,
        error: `Personaje no encontrado,su id es ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: character });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//POST de un personaje
exports.createCharacter = async (req, res, next) => {
  try {
    if (req.params.villageId) {
      req.body.village = req.params.villageId;
    }

    const village = await Village.findById(req.body.village);
    if (!village) {
      return res.status(404).json({
        success: false,
        error: `Aldea no encontrada con id ${req.body.village}`,
      });
    }

    const character = await Character.create(req.body);

    await Village.findByIdAndUpdate(
      req.body.village,
      { $addToSet: { characters: character._id } },
      { new: true }
    );

    res.status(201).json({ success: true, data: character });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//PUT de un personaje
exports.updateCharacter = async (req, res, next) => {
  try {
    let character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        error: `Personaje no encontrado, id ${req.params.id}`,
      });
    }

    const oldVillageId = character.village.toString();

    character = await Character.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (req.body.village && oldVillageId !== req.body.village) {
      await Village.findByIdAndUpdate(oldVillageId, {
        $pull: { characters: character._id },
      });

      await Village.findByIdAndUpdate(req.body.village, {
        $addToSet: { characters: character._id },
      });
    }

    res.status(200).json({ success: true, data: character });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//DELETE de un personaje
exports.deleteCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        error: `Character not found with id of ${req.params.id}`,
      });
    }

    await Village.findByIdAndUpdate(character.village, {
      $pull: { characters: character._id },
    });

    await character.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
