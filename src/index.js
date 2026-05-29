require('dotenv/config');
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

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido y escuchando en http://localhost:${PORT}`);
});