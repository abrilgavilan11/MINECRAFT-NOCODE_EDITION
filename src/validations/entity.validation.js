const validateItem = (body) => {
    const errors = [];

    if (!body || Object.keys(body).length === 0) {
        errors.push({
            field: "body", 
            message: "El cuerpo de la solicitud no puede estar vacio."
        })
        return errors;
    }

    if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
        errors.push({
            field: "name", 
            message: "El nombre el obligatorio y debe ser un texto valido."
        })
    }

    if (!body.description || typeof body.description !== "string" || body.description.trim() === "") {
        errors.push({
            field: "description", 
            message: "La descripcion es obligatoria."
        })
    }

    if (!body.rarity || typeof body.rarity !== "string" || body.rarity.trim() === "") {
        errors.push({
            field: "rarity", 
            message: "La rareza (o utilidad) es obligatoria."
        })
    }

    if (!body.imageUrl || typeof body.imageUrl !== "string" || body.imageUrl.trim() === "") {
        errors.push({
            field: "imageUrl", 
            message: "La URL de la imagen es obligatoria."
        })
    }

    return errors;
}

const validateMob = (body) => {
    const errors = []

    if (!body || Object.keys(body).length === 0) {
        errors.push({
            field: "body",
            message: "El cuerpo de la solicitud no puede estar vacio."
        })
        return errors;
    }

    if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
        errors.push({
            field: "name",
            message: "El nombre es obligatorio"
        });
    }

    if (!body.description || typeof body.description !== "string" || body.description.trim() === "") {
        errors.push({
            field: "description",
            message: "La descripción es obligatoria"
        });
    }

    if (!body.type || typeof body.type !== "string" || body.type.trim() === "") {
        errors.push({
            field: "type",
            message: "El tipo (comportamiento) es obligatorio"
        });
    }

    if (!body.imageUrl || typeof body.imageUrl !== "string" || body.imageUrl.trim() === "") {
        errors.push({
            field: "imageUrl",
            message: "La URL de la imagen es obligatoria"
        });
    }

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