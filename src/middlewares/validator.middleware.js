const { validateItem, validateMob } = require('../validations/entity.validation.js');

const itemValidator = (req, res, next) => {
  const errors = validateItem(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', details: errors });
  }
  
  next();
};

const mobValidator = (req, res, next) => {
  const errors = validateMob(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', details: errors });
  }
  
  next();
};

module.exports = {
  itemValidator,
  mobValidator
};