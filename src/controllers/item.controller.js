const itemService = require("../services/item.service.js");

const getAllItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al obtener los ítems" });
    }
};

const getItemById = async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const item = await itemService.getItemById(itemId);
        if (!item) {
        return res.status(404).json({ error: "Recurso no encontrado" });
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

const createItem = async (req, res) => {
    try {
        const newItem = await itemService.createItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        if (error.status === 400)
        return res
            .status(400)
            .json({ error: "Datos invalidos", details: error.details });
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

const updateItem = async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        if (isNaN(itemId)) {
        return res
            .status(400)
            .json({ error: "El ID provisto no es un número válido." });
        }

        const updatedItem = await itemService.updateItem(itemId, req.body);
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        if (error.status === 400)
        return res
            .status(400)
            .json({ error: "Datos invalidos", details: error.details });
        if (error.status === 404)
        return res.status(404).json({ error: "Recurso no encontrado." });
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

const deleteItem = async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        if (isNaN(itemId)) {
        return res
            .status(400)
            .json({ error: "El ID provisto no es un número válido." });
        }
        await itemService.deleteItem(itemId);
        res.status(200).json({ message: "Item eliminado con éxito" });
    } catch (error) {
        console.error(error);
        if (error.status === 404)
        return res.status(404).json({ error: "Recurso no encontrado" });
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
