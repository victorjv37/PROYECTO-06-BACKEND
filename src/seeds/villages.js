const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config(); // Let dotenv find .env in the current working directory (project root)

// Load models
const Village = require('../models/Village');
const Character = require('../models/Character');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const villagesData = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/villages.json`, 'utf-8')
);
const charactersData = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/characters.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    // Clear existing data
    await Character.deleteMany();
    await Village.deleteMany();
    console.log('Previous data deleted...');

    // Create Villages
    const createdVillages = await Village.create(villagesData);
    console.log('Villages Imported...');

    // Create a map of village names to IDs for easy lookup
    const villageMap = createdVillages.reduce((map, village) => {
      map[village.name] = village._id;
      return map;
    }, {});

    // Prepare Character data with correct village IDs
    const charactersToCreate = charactersData.map(char => ({
      ...char,
      village: villageMap[char.villageName], // Assign the actual village ID
      villageName: undefined // Remove the temporary field
    }));

    // Create Characters
    const createdCharacters = await Character.create(charactersToCreate);
    console.log('Characters Imported...');

    // Update villages with character IDs
    // Group characters by village ID
    const charactersByVillage = createdCharacters.reduce((map, char) => {
      const villageId = char.village.toString();
      if (!map[villageId]) {
        map[villageId] = [];
      }
      map[villageId].push(char._id);
      return map;
    }, {});

    // Update each village document
    for (const villageId in charactersByVillage) {
      await Village.findByIdAndUpdate(villageId, {
        $set: { characters: charactersByVillage[villageId] }
      });
    }
    console.log('Villages updated with character references...');

    console.log('Data Import Complete!');
    process.exit();
  } catch (err) {
    console.error('Error during data import:', err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Character.deleteMany();
    await Village.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error('Error during data deletion:', err);
    process.exit(1);
  }
};

// Check for command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use the -i flag to import data or -d to delete data');
  process.exit();
} 