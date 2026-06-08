const validateItem = (body) => {
    const errors = [];

    if (!body || Object.keys(body).length === 0) {
        errors.push({
            field: "body", 
            message: "El cuerpo de la solicitud no puede estar vacio."
        })
        return errors;
    }

    //? Valido campo 'imageUrl' comun
    if (!body.imageUrl || typeof body.imageUrl !== "string" || body.imageUrl.trim() === "") {
        errors.push({
            field: "imageUrl",
            message: "La URL de la imagen es obligatoria."
        })
    }

    //? Valido la estructura del array de traduccion
    if (!body.translations || !Array.isArray(body.translations) || body.translations.length === 0) {
        errors.push({
            field: "translations",
            message: "Las traducciones son obligatorias y deben ser un array"
        })
        return errors
    }

    //? Busco traducciones obligatorias para 'es' y 'en' 
    const esTrans = body.translations.find(t => t.lang === "es")
    const enTrans = body.translations.find(t => t.lang === "en")

    //? Ahora valido la traduccion en "es"
    if (!esTrans) {
        errors.push({
            field: "translations",
            message: "Falta la traduccion en español obligatoria ('es')."
        })
    }else{
        if (!esTrans.name || typeof esTrans.name !== "string" || esTrans.name.trim() === "") {
            errors.push({
                field: "translations[es].name", 
                message: "El nombre en español es obligatorio."
            })
        }
        if (!esTrans.description || typeof esTrans.description !== "string" || esTrans.description.trim() === "") {
            errors.push({
                field: "translations[es].description", 
                message: "La descripcion en español es obligatoria"
            })
        }
        if (!esTrans.rarity || typeof esTrans.rarity !== "string" || esTrans.rarity.trim() === "") {
            errors.push({
                field: "translations[es].rarity", 
                message: "La rareza (rarity) en español es obligatoria."
            })
        }
    }

    //? Ahora valido la traduccion en "en"
    if (!enTrans) {
    errors.push({
      field: "translations",
      message: "Falta la traducción en inglés obligatoria ('en')."
    });
  } else {
    if (!enTrans.name || typeof enTrans.name !== "string" || enTrans.name.trim() === "") {
      errors.push({ field: "translations[en].name", message: "El nombre en inglés es obligatorio." });
    }
    if (!enTrans.description || typeof enTrans.description !== "string" || enTrans.description.trim() === "") {
      errors.push({ field: "translations[en].description", message: "La descripción en inglés es obligatoria." });
    }
    if (!enTrans.rarity || typeof enTrans.rarity !== "string" || enTrans.rarity.trim() === "") {
      errors.push({ field: "translations[en].rarity", message: "La rareza (rarity) en inglés es obligatoria." });
    }
  }
  return errors;
};
/**
 * TODO: Valido el cuerpo de un MOB de Minecraft con traducciones
 */
const validateMob = (body) => {
  const errors = [];

  if (!body || Object.keys(body).length === 0) {
    errors.push({
      field: "body",
      message: "El cuerpo de la solicitud no puede estar vacío."
    });
    return errors;
  }

  if (!body.imageUrl || typeof body.imageUrl !== "string" || body.imageUrl.trim() === "") {
    errors.push({
      field: "imageUrl",
      message: "La URL de la imagen es obligatoria."
    });
  }

  if (
    body.health === undefined || 
    body.health === null || 
    isNaN(Number(body.health)) || 
    !Number.isInteger(Number(body.health)) || 
    Number(body.health) < 0
  ) {
    errors.push({
      field: "health", 
      message: "La vida (health) es obligatoria y debe ser un número entero mayor o igual a 0."
    });
  }
  
  if (!body.translations || !Array.isArray(body.translations) || body.translations.length === 0) {
    errors.push({
      field: "translations",
      message: "Las traducciones son obligatorias y deben ser un array."
    });
    return errors;
  }
  const esTrans = body.translations.find(t => t.lang === "es");
  const enTrans = body.translations.find(t => t.lang === "en");
  //? Ahora valido en es
  if (!esTrans) {
    errors.push({
      field: "translations",
      message: "Falta la traducción en español obligatoria ('es')."
    });
  } else {
    if (!esTrans.name || typeof esTrans.name !== "string" || esTrans.name.trim() === "") {
      errors.push({ field: "translations[es].name", message: "El nombre en español es obligatorio." });
    }
    if (!esTrans.description || typeof esTrans.description !== "string" || esTrans.description.trim() === "") {
      errors.push({ field: "translations[es].description", message: "La descripción en español es obligatoria." });
    }
    if (!esTrans.type || typeof esTrans.type !== "string" || esTrans.type.trim() === "") {
      errors.push({ field: "translations[es].type", message: "El tipo (type) en español es obligatorio." });
    }
  }
  //? Ahora valido en ingles
  if (!enTrans) {
    errors.push({
      field: "translations",
      message: "Falta la traducción en inglés obligatoria ('en')."
    });
  } else {
    if (!enTrans.name || typeof enTrans.name !== "string" || enTrans.name.trim() === "") {
      errors.push({ field: "translations[en].name", message: "El nombre en inglés es obligatorio." })
    }
    if (!enTrans.description || typeof enTrans.description !== "string" || enTrans.description.trim() === "") {
      errors.push({ field: "translations[en].description", message: "La descripción en inglés es obligatoria." })
    }
    if (!enTrans.type || typeof enTrans.type !== "string" || enTrans.type.trim() === "") {
      errors.push({ field: "translations[en].type", message: "El tipo (type) en inglés es obligatorio." })
    }
  }
  return errors;
};

module.exports = {
  validateItem, 
  validateMob
};