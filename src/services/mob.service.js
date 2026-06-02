const prisma = require("../prisma/prismaClient.js");

const getAllMobs = async () => {
    return await prisma.mob.findMany();
};

const getMobById = async (id) => {
    return await prisma.mob.findUnique({
        where: { id: id },
    });
};

const createMob = async (data) => {
    const { name, description, type, imageUrl, health } = data;
    return await prisma.mob.create({
        data: {
        name,
        description,
        type,
        imageUrl,
        health: parseInt(health),
        },
    });
};

const updateMob = async (id, data) => {
    const existingMob = await prisma.mob.findUnique({
        where: { id: id },
    });

    if (!existingMob) {
        throw { status: 404 }; 
    }

    const { name, description, type, imageUrl, health } = data;

    return await prisma.mob.update({
        where: { id: id },
        data: {
        name,
        description,
        type,
        imageUrl,
        health: parseInt(health),
        },
    });
};

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
