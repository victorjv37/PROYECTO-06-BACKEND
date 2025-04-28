const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a character name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    rank: {
      type: String,
      required: [true, 'Please add a rank'],
      enum: [
        'Academy Student',
        'Genin',
        'Chunin',
        'Tokubetsu Jonin',
        'Jonin',
        'Anbu',
        'Kage',
        'Sannin',
        'Missing-nin',
        'Civilian',
        'Other'
      ]
    },
    clan: {
      type: String,
      trim: true,
      maxlength: [50, 'Clan name can not be more than 50 characters']
    },
    // Relationship: Character belongs to one Village
    village: {
      type: mongoose.Schema.ObjectId,
      ref: 'Village', // Reference to the Village model
      required: [true, 'Please add a village ID']
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('Character', CharacterSchema); 