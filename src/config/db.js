const mongoose = require("mongoose");

const connectarBD = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conexion.connection.host}`);
  } catch (error) {
    console.log(`Error de conexion a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectarBD;
