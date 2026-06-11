const itemService = require("../services/item.service.js");
const { validateItem } = require("../validations/entity.validation.js");

const flattenItem = (item) => {
  if (!item) return null;
  const translation = item.ItemTranslation?.[0] || {};
  const { ItemTranslation, ...rest } = item;
  return {
    ...rest,
    name: translation.name || "",
    description: translation.description || "",
    rarity: translation.rarity || ""
  };
};

const getAllItems = async (req, res) => {
  try {
    const lang = req.query.lang || "es";
    const items = await itemService.getAllItems(lang);
    const flattenedItems = items.map(flattenItem);
    res.json(flattenedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un problema al obtener los ítems" });
  }
};

const getItemById = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId)) {
      return res.status(400).json({ error: "El ID provisto no es un número válido." });
    }

    const lang = req.query.lang || "es";
    const item = await itemService.getItemById(itemId, lang);
    if (!item) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.json(flattenItem(item));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
};

const createItem = async (req, res) => {
    try {
        const { name, imageUrl, translations } = req.body; // <-- Acá está la clave
        
        const newItem = await itemService.createItem({ 
            name, 
            imageUrl, 
            translations 
        });
        
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

const updateItem = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId)) {
      return res.status(400).json({ error: "El ID provisto no es un número válido." });
    }

    const errors = validateItem(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: "Datos invalidos", details: errors });
    }

    const { name, imageUrl, translations } = req.body; 

    const updatedItem = await itemService.updateItem(itemId, { 
        name, 
        imageUrl, 
        translations 
    });

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({ error: "Recurso no encontrado." });
    }
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId)) {
      return res.status(400).json({ error: "El ID provisto no es un número válido." });
    }
    await itemService.deleteItem(itemId);
    res.status(200).json({ message: "Item eliminado con éxito" });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};