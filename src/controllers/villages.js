const Village = require('../models/Village');
const Character = require('../models/Character');

// @desc    Get all villages
// @route   GET /api/v1/villages
// @access  Public
exports.getVillages = async (req, res, next) => {
  try {
    const villages = await Village.find().populate('characters'); // Populate characters
    res.status(200).json({ success: true, count: villages.length, data: villages });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single village
// @route   GET /api/v1/villages/:id
// @access  Public
exports.getVillage = async (req, res, next) => {
  try {
    const village = await Village.findById(req.params.id).populate('characters');
    if (!village) {
      return res.status(404).json({ success: false, error: 'Village not found' });
    }
    res.status(200).json({ success: true, data: village });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new village
// @route   POST /api/v1/villages
// @access  Public
exports.createVillage = async (req, res, next) => {
  try {
    const village = await Village.create(req.body);
    res.status(201).json({ success: true, data: village });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update village
// @route   PUT /api/v1/villages/:id
// @access  Public
exports.updateVillage = async (req, res, next) => {
  try {
    // Note: We explicitly DO NOT update the characters array here.
    // That should be handled via character creation/deletion or a dedicated endpoint.
    const { name, country } = req.body;
    const village = await Village.findByIdAndUpdate(req.params.id, { name, country }, {
      new: true, // Return the updated document
      runValidators: true // Run mongoose validators
    });

    if (!village) {
      return res.status(404).json({ success: false, error: 'Village not found' });
    }
    res.status(200).json({ success: true, data: village });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete village
// @route   DELETE /api/v1/villages/:id
// @access  Public
exports.deleteVillage = async (req, res, next) => {
  try {
    const village = await Village.findById(req.params.id);

    if (!village) {
      return res.status(404).json({ success: false, error: 'Village not found' });
    }

    // Before deleting the village, delete associated characters
    await Character.deleteMany({ village: village._id });

    await village.deleteOne(); 

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}; 