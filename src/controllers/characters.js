const Character = require("../models/Character");
const Village = require("../models/Village");

//GET de todos los personajes
exports.getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find().populate({
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
    req.body.village = req.params.villageId;

    const village = await Village.findById(req.params.villageId);
    if (!village) {
      return res.status(404).json({
        success: false,
        error: `Village not found with id of ${req.params.villageId}`,
      });
    }

    const character = await Character.create(req.body);

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

    character = await Character.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

    await character.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
