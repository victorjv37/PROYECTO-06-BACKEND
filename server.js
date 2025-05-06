const express = require("express");
const dotenv = require("dotenv");
const connectarBD = require("./src/config/db");
const villages = require("./src/routes/villages");
const characters = require("./src/routes/characters");

dotenv.config();

connectarBD();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/villages", villages);
app.use("/api/v1/characters", characters);

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`El servidor no responde, ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
