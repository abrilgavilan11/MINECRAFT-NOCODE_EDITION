const prisma = require('../prisma/prismaClient')

const flattenEntity = (entity, type) => {
    if(!entity) return null; 
    if(type === "item") {
        const translation = entity.ItemTranslation?.[0] || {}; 
        const {ItemTranslation, ...rest} = entity; 
        return {
            ...rest, 
            type: "ITEM", 
            name: translation.name || "", 
            description: translation.description || "", 
            rarity: translation.rarity || ""
        };
    }else{
        const translation = entity.MobTranslation?.[0] || {}; 
        const {MobTranslation, ...rest} = entity; 
        return {
            ...rest, 
            type: "MOB", 
            name: translation.name || "", 
            description: translation.description || "", 
            behavior: translation.type || ""
        }
    }
}

const getFavorites = async (req, res) => {
    const userId = req.user.userId; 
    const lang = req.query.lang || "es"; 

    try {
        const favorites = await prisma.favorite.findMany({
            where: {userId},
        });

        const itemIds = favorites.filter(f => f.entityType.toLowerCase() === 'item').map(f => f.entityId);
        const mobIds = favorites.filter(f => f.entityType.toLowerCase() === 'mob').map(f => f.entityId);

        const itemsPromise = itemIds.length > 0 ? prisma.item.findMany({
            where: { id: { in: itemIds } },
            include: {
                ItemTranslation: {
                    where: { lang: { in: [lang] } }
                }
            }
        }) : Promise.resolve([]);

        const mobsPromise = mobIds.length > 0 ? prisma.mob.findMany({
            where: { id: { in: mobIds } },
            include: {
                MobTranslation: {
                    where: { lang: { in: [lang] } }
                }
            }
        }) : Promise.resolve([]);

        const [items, mobs] = await Promise.all([itemsPromise, mobsPromise]);

        const itemsMap = new Map(items.map(item => [item.id, item]));
        const mobsMap = new Map(mobs.map(mob => [mob.id, mob]));

        const fullFavorites = favorites.map((fav) => {
            let entityDetails = null; 

            if(fav.entityType.toLowerCase() === 'item'){
                entityDetails = itemsMap.get(fav.entityId) || null;
            }else if(fav.entityType.toLowerCase() === 'mob'){
                entityDetails = mobsMap.get(fav.entityId) || null;
            }

            return {
                id: fav.id, 
                entityId: fav.entityId, 
                entityType: fav.entityType, 
                createdAt: fav.createdAt,
                details: flattenEntity(entityDetails, fav.entityType.toLowerCase())
            }
        });

        res.status(200).json(fullFavorites);
    } catch (error) {
        console.error('Error al obtener favoritos:', error)
        res.status(500).json({error: "Error interno del servidor."})
    }
}

const addFavorite = async (req, res) => {
    const userId = req.user.userId; 
    const entityId = parseInt(req.params.id); 
    const {entityType} = req.body; 

    if(isNaN(entityId) || !entityType){ 
        return res.status(400).json({error: "Datos de entrada invalidos."})
    }

    try {
        let entityExists = false; 
        if(entityType.toLowerCase() === 'item') {
            const item= await prisma.item.findUnique({where: {id: entityId}}); 
            entityExists = !!item;
        }else if(entityType.toLowerCase() === 'mob') {
            const mob = await prisma.mob.findUnique({where: {id: entityId}}); 
            entityExists = !!mob; 
        }

        if(!entityExists){
            return res.status(404).json({error: `El ${entityType} con id ${entityId} no existe.`})
        }

        const existingFav = await prisma.favorite.findUnique({
            where: {
                userId_entityId_entityType: {
                    userId, 
                    entityId, 
                    entityType: entityType.toLowerCase(),
                }
            }
        })

        if(existingFav){
            return res.status(409).json({error: "Este elemento ya esta en tus favoritos."})
        }

        const newFavorite = await prisma.favorite.create({
            data: {
                userId, 
                entityId, 
                entityType: entityType.toLowerCase(),
            }
        })

        res.status(201).json({message: "Favorito agregado con exito.", favorite: newFavorite})
    } catch (error) {
        console.error("Error al agregar favorito.", error); 
        res.status(500).json({error: "Error interno del servidor."})
    }
}

const removeFavorite = async (req, res) => {
    const userId = req.user.userId; 
    const entityId = parseInt(req.params.id); 
    const entityType = req.query.entityType || req.body.entityType;

    if(isNaN(entityId) || !entityType){
        return res.status(400).json({error: "Faltan parametros para elminar el favorito"})
    }

    try {
        const favorite = await prisma.favorite.findUnique({
            where:{
                userId_entityId_entityType: {
                    userId, 
                    entityId, 
                    entityType: entityType.toLowerCase(), 
                }
            }
        })

        if(!favorite){
            return res.status(404).json({error: "El favorito no existe para este usuario."})
        }

        await prisma.favorite.delete({
            where: {
                id: favorite.id
            }
        })

        res.status(200).json({message: "Favorito eliminado con exito."})
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        res.status(500).json({error: "Error interno del servidor."})
    }
}

module.exports = {
    getFavorites, 
    addFavorite, 
    removeFavorite,
}