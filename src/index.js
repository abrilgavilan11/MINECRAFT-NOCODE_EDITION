require('dotenv').config();
const app = require('./app.js'); 

console.log(" FRONTEND_URL en memoria del servidor:", process.env.FRONTEND_URL);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡La API de Minecraft está funcionando perfectamente! 🚀 probá ir a /api/items o /api/mobs');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API funcionando correctamente"
  });
});

app.use("/api/items", itemRoutes)
app.use("/api/mobs", mobRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido y escuchando en http://localhost:${PORT}`);
});

module.exports = app;