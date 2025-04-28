const mongoose = require('mongoose');

const VillageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a village name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    country: {
      type: String,
      required: [true, 'Please add a country'],
      maxlength: [50, 'Country can not be more than 50 characters']
    },
    characters: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Character' 
      }
    ]
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  }
);

// Reverse populate with virtuals
// When we get a village, we want to see the characters associated with it
// We define a virtual field 'villageCharacters' on the Village schema
// VillageSchema.virtual('villageCharacters', {
//   ref: 'Character', // The model to use
//   localField: '_id', // Find characters where `localField`
//   foreignField: 'village', // is equal to `foreignField`
//   justOne: false // We want multiple characters, not just one
// });
// Note: Virtual populate might be more complex than needed for basic CRUD initially.
// We'll manage the relationship primarily through the Character model's village field
// and by updating the Village's characters array.

module.exports = mongoose.model('Village', VillageSchema); 