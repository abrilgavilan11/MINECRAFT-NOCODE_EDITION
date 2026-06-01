/**
 * TODO: Con esto validamos el cuerpo de un ITEM de Minecraft
 */
const validateItem = (body) => {
    const errors = [];

    //? Evito objetos vacios. 
    if (!body || Object.keys(body).length === 0) {
        errors.push({
            field: "body", 
            message: "El cuerpo de la solicitud no puede estar vacio."
        })
        return errors;
    }

    //? Valido el campo 'name' (obligatorio, string, no vacio)
    if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
        errors.push({
            field: "name", 
            message: "El nombre el obligatorio y debe ser un texto valido."
        })
    }

    //? Valido campo 'description' (obligatorio, string, no vacio)
    if (!body.description || typeof body.description !== "string" || body.description.trim() === "") {
        errors.push({
            field: "description", 
            message: "La descripcion es obligatoria."
        })
    }

    //? Valido campo 'rarity' (obligatorio, string, no vacio)
    if (!body.rarity || typeof body.rarity !== "string" || body.rarity.trim() === "") {
        errors.push({
            field: "rarity", 
            message: "La rareza (o utilidad) es obligatoria."
        })
    }

    //? Valido campo 'imageUrl' (obligatorio, string, no vacio)
    if (!body.imageUrl || typeof body.imageUrl !== "string" || body.imageUrl.trim() === "") {
        errors.push({
            field: "imageUrl", 
            message: "La URL de la imagen es obligatoria."
        })
    }

    return errors;
}

/**
 * TODO: Con esto validamos el cuerpo de un MOB de Minecraft
 */
const validateMob = (body) => {
    const errors = []

    //? Evito objetos vacios. 
    if (!body || Object.keys(body).length === 0) {
        errors.push({
            field: "body",
            message: "El cuerpo de la solicitud no puede estar vacio."
        })
        return errors;
    }

    //? Valido campo name
    if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
        errors.push({
            field: "name",
            message: "El nombre es obligatorio"
        });
    }

    //? Valido campo 'description'
    if (!body.description || typeof body.description !== "string" || body.description.trim() === "") {
        errors.push({
            field: "description",
            message: "La descripción es obligatoria"
        });
    }

    //? Valido campo 'type' (el comportamiento/tipo del mob)
    if (!body.type || typeof body.type !== "string" || body.type.trim() === "") {
        errors.push({
            field: "type",
            message: "El tipo (comportamiento) es obligatorio"
        });
    }

    //? Valido campo 'imageUrl'
    if (!body.imageUrl || typeof body.imageUrl !== "string" || body.imageUrl.trim() === "") {
        errors.push({
            field: "imageUrl",
            message: "La URL de la imagen es obligatoria"
        });
    }

    //? Valido campo 'health' (obligatorio, numero entero valido y mayor o igual a 0)
    if (body.health === undefined || body.health === null || isNaN(Number(body.health)) || !Number.isInteger(Number(body.health)) || Number(body.health) < 0) {
        errors.push({
            field: "health", 
            message: "La vida (health) es obligatoria y debe ser un numero entero mayor o igual a 0."
        })
    }
    return errors;
}; 

module.exports = {
    validateItem, 
    validateMob
};