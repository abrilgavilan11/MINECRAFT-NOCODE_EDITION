const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger.middleware.js');
const itemRoutes = require('./routes/item.routes.js');
const mobRoutes = require('./routes/mob.routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('¡La API de Minecraft está funcionando perfectamente! 🚀 probá ir a /api/items o /api/mobs');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API funcionando correctamente"
  });
});

app.use('/api/items', itemRoutes);
app.use('/api/mobs', mobRoutes);

module.exports = app;