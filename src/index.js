require('dotenv/config');
console.log("🔍 FRONTEND_URL en memoria del servidor:", process.env.FRONTEND_URL);
const express = require('express');
const cors = require('cors');

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());


app.get('/', (req, res) => {
  res.send('¡La API de Minecraft está funcionando perfectamente! 🚀 probá ir a /api/items o /api/mobs');
});
app.get('/api/items', async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al obtener los ítems' });
  }
});

app.get('/api/mobs', async (req, res) => {
  try {
    const mobs = await prisma.mob.findMany();
    res.json(mobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al obtener los mobs' });
  }
});

//TODO: Asi se obtiene un item especifico por ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const item = await prisma.item.findUnique({
      where: { id: itemId }
    });
    
    if (!item) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inesperado del servidor' });
  }
});

//TODO: Asi se obtiene un mob especifico por ID
app.get('/api/mobs/:id', async (req, res) => {
  try {
    const mobId = parseInt(req.params.id);
    const mob = await prisma.mob.findUnique({
      where: { id: mobId }
    });
    
    if (!mob) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    res.json(mob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inesperado del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido y escuchando en http://localhost:${PORT}`);
});