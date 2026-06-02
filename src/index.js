require('dotenv').config();

console.log(" FRONTEND_URL en memoria del servidor:", process.env.FRONTEND_URL);

const express = require('express');
const cors = require('cors');

const itemRoutes = require("./routes/item.routes.js");
const mobRoutes = require("./routes/mob.routes.js");

const app = express();
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

//! ==================== ENDPOINTS CRUD PARA ITEMS ====================

//* POST para /api/items
app.post('/api/items', async (req, res) => {
  try {
    const errors = validateItem(req.body)
      if (errors.length > 0) {
        return res.status(400).json({ error: 'Datos invalidos', details: errors});
      }

    const {name, description, rarity, imageUrl} = req.body; 
    const newItem = await prisma.item.create({
      data: {name, description, rarity, imageUrl}
    })

    res.status(201).json(newItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error inesperado del servidor'})
  }
})

//* PUT para /api/items/:id
app.put('/api/items/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id)
      if (isNaN(itemId)) {
        return res.status(400).json({ error: 'El ID provisto no es un numero valido.'})
      }
    const errors = validateItem(req.body)
      if (errors.length > 0) {
        return res.status(400).json({ error: 'Datos invalidos', details: errors})
      }

    //? Verifico si existe el recurso para evitar romper la consulta de prisma. 
    const existingItem = await prisma.item.findUnique({
      where: {id: itemId}
    })
      if (!existingItem) {
        return res.status(404).json({ error: 'Recurso no encontrado.'})
      }

    const {name, description, rarity, imageUrl} = req.body
    const updateItem = await prisma.item.update({
      where: {id: itemId}, 
      data: {name, description, rarity, imageUrl}
    })

    res.json(updateItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error inesperado del servidor'})
  }
})

//* DELETE para /api/items/:id
app.delete('/api/items/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id)
      if (isNaN(itemId)) {
        return res.status(400).json({ error: 'El ID provisto no es un numero valido.'})
      }

    //? Verifico si existe. 
    const existingItem = await prisma.item.findUnique({
      where: {id: itemId}
    })
      if (!existingItem) {
        return res.status(404).json({ error: 'Recurso no encontrado'})
      }
    
    await prisma.item.delete({
      where: {id: itemId}
    })

    res.status(200).json({ message: 'Item eliminado con exito'})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error inesperado del servidor'})
  }
})

//! ==================== ENDPOINTS CRUD PARA MOBS ====================

//? POST para /api/mobs
app.post('/api/mobs', async (req, res) => {
  try {
    const errors = validateMob(req.body)
      if (errors.length > 0) {
        return res.status(400).json({ error: 'Datos invalidos', details: errors})
      }
    
      const {name, description, type, imageUrl, health } = req.body
      const newMob = await prisma.mob.create({
        data: {
          name,
          description,
          type,
          imageUrl,
          health: parseInt(health)

        }
      })

      res.status(200).json(newMob)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error inesperado del servidor'})
  }
})

//? PUT para /api/mobs/:id
app.put('/api/mobs/:id', async (req, res) => {
  try {
    const mobId = parseInt(req.params.id)
      if (isNaN(mobId)) {
        return res.status(400).json({ error: 'El ID provisto  no es un numero valido'})
      }
    
    const errors = validateMob(req.body)
      if (errors.length > 0) {
        return res.status(400).json({ error: 'Datos invalidos', details: errors})
      }

    //? Verifico si existe.
    const existingMob = await prisma.mob.findUnique({
      where: {id: mobId}
    })
      if (!existingMob) {
        return res.status(404).json({ error: 'Recurso no encontrado'})
      }

    const {name, description, type, imageUrl, health} = req.body
    const updateMob =  await prisma.mob.update({
      where: {id: mobId}, 
      data: {
        name, 
        description, 
        type,
        imageUrl, 
        health: parseInt(health)
      }
    })
    res.json(updateMob)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error inesperado del servidor.'})
  }
})

//? DELETE para /api/mobs/:id
app.delete('/api/mobs/:id', async (req, res) => {
  try {
    const mobId = parseInt(req.params.id)
      if (isNaN(mobId)) {
        return res.status(400).json({ error: 'El ID provisto no es un numero valido.'})
      }

    //?Verifico si existe.
    const existingMob = await prisma.mob.findUnique({
      where: {id: mobId}
    })
      if (!existingMob) {
        return res.status(404).json({ error: 'Recurso no encontrado.'})
      }

    await prisma.mob.delete({
      where: {id: mobId}
    })

    res.status(200).json({ message: 'Mob eliminado con exito'})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error inesperado del servidor'})
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido y escuchando en http://localhost:${PORT}`);
});

module.exports = app;
