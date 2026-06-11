const prisma = require("../prisma/prismaClient.js");

//* Obtengo todos los items filtrando la relacion por el idioma actual. 
const getAllItems = async (lang = "es") => {
    return await prisma.item.findMany({
        include: {
            ItemTranslation: {
                where: {
                    lang: {in: [lang]}
                }
            }
        }
    })
}

//* Obtengo un unico items con su traduccion 
const getItemById = async (id, lang = "es") => {
    return await prisma.item.findUnique({
        where: {id: id}, 
        include: {
            ItemTranslation: {
                where: {
                    lang: {in: [lang]}
                }
            }
        }
    })
}

//* CREACION ANIDADA Inserto el item comun y sus traducciones asociadas en una sola consulta. 
const createItem = async (data) => {
    const { name, imageUrl, translations } = data;
    
    return await prisma.item.create({
        data: {
            name: name,
            imageUrl,
            ItemTranslation: {
                create: translations
            }
        },
        include: { ItemTranslation: true }
    });
};

//* EDICION elimino traducciones viejas y pongo las nuevas para ese item 
const updateItem = async (id, data) => {
    const existingItem = await prisma.item.findUnique({
        where: {id: id}
    })
    if (!existingItem) {
        throw {status: 404}
    }

    const {name, imageUrl, translations} = data

    await prisma.itemTranslation.deleteMany({
        where: {itemId: id}
    })

    return await prisma.item.update({
        where: {id: id}, 
        data: {
            name,
            imageUrl, 
            ItemTranslation: {
                create: translations
            }
        },
        include: {
            ItemTranslation: true
        }
    })
}

//* Eliminacion nuestra bd se encarga de eliminar las traducciones en cascada. 
const deleteItem = async (id) => {
    const existingItem = await prisma.item.findUnique({
        where: {id: id}
    })
    if (!existingItem) {
        throw { status: 404}
    }
    return await prisma.item.delete({
        where: {id: id}
    })
}

module.exports = {
    getAllItems,
    getItemById, 
    createItem, 
    updateItem, 
    deleteItem,
}