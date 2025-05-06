const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Village = require("../models/Village");
const Character = require("../models/Character");

mongoose.connect(process.env.MONGO_URI);

const aldeasData = JSON.parse(
  fs.readFileSync("./src/seeds/_data/villages.json", "utf-8")
);
const personajesData = JSON.parse(
  fs.readFileSync("./src/seeds/_data/characters.json", "utf-8")
);

const importData = async () => {
  try {
    await Village.deleteMany();
    await Character.deleteMany();

    const aldeas = await Village.create(aldeasData);

    //me quedo con cada aldea creada
    const mapaAldeas = {};
    aldeas.forEach((aldea) => {
      mapaAldeas[aldea.name] = aldea._id;
    });

    //le asigno el id de la aldea a cada personaje
    const personajesConAldea = personajesData.map((personaje) => {
      // Solo tomamos los campos válidos
      const nuevoPersonaje = {
        name: personaje.name,
        rank: personaje.rank,
        village: mapaAldeas[personaje.villageName],
      };
      // Solo agregamos clan si existe
      if (personaje.clan) {
        nuevoPersonaje.clan = personaje.clan;
      }
      return nuevoPersonaje;
    });

    const personajes = await Character.create(personajesConAldea);

    //agrupo personajes por cada aldea
    const personajesPorAldea = {};
    personajes.forEach((personaje) => {
      const idAldea = personaje.village.toString();
      if (!personajesPorAldea[idAldea]) personajesPorAldea[idAldea] = [];
      personajesPorAldea[idAldea].push(personaje._id);
    });

    //actualizamos cada aldea con los ids de sus personajes
    for (const idAldea in personajesPorAldea) {
      await Village.findByIdAndUpdate(idAldea, {
        characters: personajesPorAldea[idAldea],
      });
    }

    console.log("Datos importados");
    process.exit();
  } catch (error) {
    console.error("Error al importar datos:", error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Village.deleteMany();
    await Character.deleteMany();
    console.log("¡Datos eliminados!");
    process.exit();
  } catch (error) {
    console.error("Error al eliminar datos:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
} else {
  console.log("Usa '-i' para importar o '-d' para eliminar datos");
  process.exit();
}
