const mobService = require("../services/mob.service.js");

const getAllMobs = async (req, res) => {
    try {
        const mobs = await mobService.getAllMobs();
        res.json(mobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al obtener los mobs" });
    }
};

const getMobById = async (req, res) => {
    try {
        const mobId = parseInt(req.params.id);
        const mob = await mobService.getMobById(mobId);

        if (!mob) {
        return res.status(404).json({ error: "Recurso no encontrado" });
        }
        res.json(mob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

const createMob = async (req, res) => {
    try {
        const newMob = await mobService.createMob(req.body);
        res.status(201).json(newMob);
    } 
    catch (error) {
        console.error(error);
        if (error.status === 400) {
        return res
            .status(400)
            .json({ error: "Datos inválidos", details: error.details });
        }
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

const updateMob = async (req, res) => {
    try {
        const mobId = parseInt(req.params.id);
        if (isNaN(mobId)) {
        return res
            .status(400)
            .json({ error: "El ID provisto no es un número válido" });
        }
        const updatedMob = await mobService.updateMob(mobId, req.body);
        res.json(updatedMob);
    } 
    catch (error) {
        console.error(error);
        if (error.status === 400)
        return res
            .status(400)
            .json({ error: "Datos inválidos", details: error.details });
        if (error.status === 404)
        return res.status(404).json({ error: "Recurso no encontrado" });
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

const deleteMob = async (req, res) => {
    try {
        const mobId = parseInt(req.params.id);
        if (isNaN(mobId)) {
        return res
            .status(400)
            .json({ error: "El ID provisto no es un número válido" });
        }
        await mobService.deleteMob(mobId);
        res.status(200).json({ message: "Mob eliminado con éxito" });
    } 
    catch (error) {
        console.error(error);
        if (error.status === 404)
        return res.status(404).json({ error: "Recurso no encontrado" });
        res.status(500).json({ error: "Error inesperado del servidor" });
    }
};

module.exports = {
    getAllMobs,
    getMobById,
    createMob,
    updateMob,
    deleteMob
};
