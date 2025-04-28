const Character = require('../models/Character');
const Village = require('../models/Village');

// @desc    Get all characters
// @route   GET /api/v1/characters
// @route   GET /api/v1/villages/:villageId/characters
// @access  Public
exports.getCharacters = async (req, res, next) => {
  try {
    let query;

    if (req.params.villageId) {
      // Get characters for a specific village
      query = Character.find({ village: req.params.villageId }).populate({
        path: 'village',
        select: 'name country' // Select specific fields from village
      });
    } else {
      // Get all characters
      query = Character.find().populate({
        path: 'village',
        select: 'name country'
      });
    }

    const characters = await query;

    res.status(200).json({ success: true, count: characters.length, data: characters });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single character
// @route   GET /api/v1/characters/:id
// @access  Public
exports.getCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id).populate({
      path: 'village',
      select: 'name country'
    });

    if (!character) {
      return res.status(404).json({ success: false, error: `Character not found with id of ${req.params.id}` });
    }

    res.status(200).json({ success: true, data: character });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new character
// @route   POST /api/v1/villages/:villageId/characters
// @access  Public
  exports.createCharacter = async (req, res, next) => {
  try {
    // Add villageId from URL params to the request body
    req.body.village = req.params.villageId;

    // Check if the village exists
    const village = await Village.findById(req.params.villageId);
    if (!village) {
      return res.status(404).json({ success: false, error: `Village not found with id of ${req.params.villageId}` });
    }

    // Create the character
    const character = await Character.create(req.body);

    // Add character to village's character array (using $addToSet to avoid duplicates)
    await Village.findByIdAndUpdate(
      req.params.villageId,
      { $addToSet: { characters: character._id } }, // Use $addToSet
      { new: true, runValidators: true }
    );

    res.status(201).json({ success: true, data: character });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update character
// @route   PUT /api/v1/characters/:id
// @access  Public
exports.updateCharacter = async (req, res, next) => {
  try {
    let character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ success: false, error: `Character not found with id of ${req.params.id}` });
    }

    // Prevent village field from being updated directly via this route
    // To change village, one might need to delete and recreate the character or use a specific "transfer" endpoint
    if (req.body.village) {
        delete req.body.village;
    }

    character = await Character.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: character });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete character
// @route   DELETE /api/v1/characters/:id
// @access  Public
exports.deleteCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ success: false, error: `Character not found with id of ${req.params.id}` });
    }

    // Remove character ID from the corresponding village's array
    await Village.findByIdAndUpdate(
      character.village, // Get village ID from the character doc
      { $pull: { characters: character._id } }, // Use $pull to remove the ID
      { new: true }
    );

    await character.deleteOne(); // Use deleteOne mongoose document method

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}; 