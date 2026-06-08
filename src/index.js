if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./app.js'); 

console.log(" FRONTEND_URL en memoria del servidor:", process.env.FRONTEND_URL);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend encendido y escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;