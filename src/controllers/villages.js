const Village = require("../models/Village");
const Character = require("../models/Character");

//GET de todas las aldeas
exports.getVillages = async (req, res, next) => {
  try {
    const villages = await Village.find().populate("characters");
    res
      .status(200)
      .json({ success: true, count: villages.length, data: villages });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//GET de una aldea
exports.getVillage = async (req, res, next) => {
  try {
    const village = await Village.findById(req.params.id).populate(
      "characters"
    );
    if (!village) {
      return res.status(404).json({
        success: false,
        error: `Aldea no encontrada, id: ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: village });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//POST de una aldea
exports.createVillage = async (req, res, next) => {
  try {
    const village = await Village.create(req.body);
    res.status(201).json({ success: true, data: village });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//PUT de una aldea
exports.updateVillage = async (req, res, next) => {
  try {
    const { name, country } = req.body;
    const village = await Village.findByIdAndUpdate(
      req.params.id,
      { name, country },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!village) {
      return res.status(404).json({
        success: false,
        error: `Aldea no encontrada, id ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: village });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//DELETE de una aldea
exports.deleteVillage = async (req, res, next) => {
  try {
    const village = await Village.findById(req.params.id);

    if (!village) {
      return res.status(404).json({
        success: false,
        error: `Aldea no encontrada, id ${req.params.id}`,
      });
    }

    // Antes de eliminar la aldea, eliminamos los personajes asociados a esa aldea
    await Character.deleteMany({ village: village._id });

    await village.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
