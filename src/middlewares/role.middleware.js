const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ 
            error: 'Acceso denegado. No tienes los permisos de administrador necesarios para realizar esta acción.' 
        });
    }

    next();
};

module.exports = { verifyAdmin };