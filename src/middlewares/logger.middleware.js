const logger = (req, res, next) => {
  const hora = new Date().toLocaleTimeString('es-AR');
  console.log(`[${hora}] 🟢 Petición entrante: ${req.method} a ${req.url}`);
  next();
};

module.exports = logger;