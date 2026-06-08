const prisma = require("../prisma/prismaClient.js");

//* Obtengo todos los mobs filtrados por el idioma 
const getAllMobs = async (lang = "es") => {
  return await prisma.mob.findMany({
    include: {
      MobTranslation: {
        where: {
          lang: { in: [lang] }
        }
      }
    }
  });
};

//* Obtengo un unico mob con su traduccion 
const getMobById = async (id, lang = "es") => {
  return await prisma.mob.findUnique({
    where: { id: id },
    include: {
      MobTranslation: {
        where: {
          lang: { in: [lang] }
        }
      }
    }
  });
};

//* Hago una creacion anidada de Mobs
const createMob = async (data) => {
  const { imageUrl, health, translations } = data;
  return await prisma.mob.create({
    data: {
      imageUrl,
      health: parseInt(health),
      MobTranslation: {
        create: translations
      }
    },
    include: {
      MobTranslation: true
    }
  });
};

//* Edito los mobs y sus traducciones
const updateMob = async (id, data) => {
  const existingMob = await prisma.mob.findUnique({
    where: { id: id },
  });
  if (!existingMob) {
    throw { status: 404 };
  }

  const { imageUrl, health, translations } = data;

  await prisma.mobTranslation.deleteMany({
    where: { mobId: id }
  });

  return await prisma.mob.update({
    where: { id: id },
    data: {
      imageUrl,
      health: parseInt(health),
      MobTranslation: {
        create: translations
      }
    },
    include: {
      MobTranslation: true
    }
  });
};

//* Hago una eliminacion en cascada de mobs
const deleteMob = async (id) => {
  const existingMob = await prisma.mob.findUnique({
    where: { id: id },
  });
  if (!existingMob) {
    throw { status: 404 };
  }
  return await prisma.mob.delete({
    where: { id: id },
  });
};

module.exports = {
  getAllMobs,
  getMobById,
  createMob,
  updateMob,
  deleteMob,
};
