require("dotenv/config");
const express = require("express");
const cors = require("cors");

const itemRoutes = require("./routes/item.routes.js");
const mobRoutes = require("./routes/mob.routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "¡La API de Minecraft está funcionando perfectamente! 🚀 probá ir a /api/items o /api/mobs",
  );
});

app.use("/api/items", itemRoutes);
app.use("/api/mobs", mobRoutes);

app.listen(PORT, () => {
  console.log(
    `🚀 Servidor backend encendido y escuchando en http://localhost:${PORT}`,
  );
});
