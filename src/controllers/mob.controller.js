const mobService = require("../services/mob.service.js");
const { validateMob } = require("../validations/entity.validation.js");

const flattenMob = (mob) => {
  if (!mob) return null;
  const translation = mob.MobTranslation?.[0] || {};
  const { MobTranslation, ...rest } = mob;
  return {
    ...rest,
    name: translation.name || "",
    description: translation.description || "",
    type: translation.type || ""
  };
};

const getAllMobs = async (req, res) => {
  try {
    const lang = req.query.lang || "es";
    const mobs = await mobService.getAllMobs(lang);
    const flattenedMobs = mobs.map(flattenMob);
    res.json(flattenedMobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un problema al obtener los mobs" });
  }
};

const getMobById = async (req, res) => {
  try {
    const mobId = parseInt(req.params.id);
    if (isNaN(mobId)) {
      return res.status(400).json({ error: "El ID provisto no es un número válido" });
    }

    const lang = req.query.lang || "es";
    const mob = await mobService.getMobById(mobId, lang);
    if (!mob) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.json(flattenMob(mob));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
};

const createMob = async (req, res) => {
  try {
    const errors = validateMob(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: "Datos invalidos", details: errors });
    }

    const newMob = await mobService.createMob(req.body);
    res.status(201).json(newMob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
};

const updateMob = async (req, res) => {
  try {
    const mobId = parseInt(req.params.id);
    if (isNaN(mobId)) {
      return res.status(400).json({ error: "El ID provisto no es un número válido" });
    }

    const errors = validateMob(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: "Datos invalidos", details: errors });
    }

    const updatedMob = await mobService.updateMob(mobId, req.body);
    res.json(updatedMob);
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
};

const deleteMob = async (req, res) => {
  try {
    const mobId = parseInt(req.params.id);
    if (isNaN(mobId)) {
      return res.status(400).json({ error: "El ID provisto no es un número válido." });
    }
    await mobService.deleteMob(mobId);
    res.status(200).json({ message: "Mob eliminado con éxito" });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
};

module.exports = {
  getAllMobs,
  getMobById,
  createMob,
  updateMob,
  deleteMob,
};
