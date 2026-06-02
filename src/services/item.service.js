const prisma = require("../prisma/prismaClient.js");

const getAllItems = async () => {
    return await prisma.item.findMany();
};

const getItemById = async (id) => {
    return await prisma.item.findUnique({
        where: { id: id },
    });
};

const createItem = async (data) => {
    const { name, description, rarity, imageUrl } = data;
    return await prisma.item.create({
        data: { name, description, rarity, imageUrl },
    });
};

const updateItem = async (id, data) => {
    const existingItem = await prisma.item.findUnique({
        where: { id: id },
    });
    if (!existingItem) {
        throw { status: 404 };
    }
    const { name, description, rarity, imageUrl } = data;
    return await prisma.item.update({
        where: { id: id },
        data: { name, description, rarity, imageUrl },
    });
};

const deleteItem = async (id) => {
    const existingItem = await prisma.item.findUnique({
        where: { id: id },
    });
    if (!existingItem) {
        throw { status: 404 };
    }
    return await prisma.item.delete({
        where: { id: id },
    });
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};
