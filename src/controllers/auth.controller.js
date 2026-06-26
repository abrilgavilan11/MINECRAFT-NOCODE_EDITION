const authService = require("../services/auth.service.js");

const register = async (req, res) => {
    try {
        const newUser = await authService.registerUser(req.body);
        res.status(201).json({
        message: "Usuario registrado correctamente.",
        user: newUser,
        });
    } catch (error) {
        console.error("Error en registro:", error);
        if (error.status === 409) {
        return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

const login = async (req, res) => {
    try {
        const authData = await authService.loginUser(req.body);
        res.status(200).json({
        message: "Inicio de sesión exitoso.",
        token: authData.token,
        refreshToken: authData.refreshToken,
        user: authData.user,
        });
    } catch (error) {
        console.error("Error en login:", error);
        if (error.status === 401) {
        return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const result = await authService.refreshAccessToken(refreshToken); 
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al refrescar token:", error);
        res.status(error.status || 500).json({message: error.message || "Error interno del servidor"})
    } 
}

const logout = async (req, res) => {
    const {refreshToken} = req.body; 
    try {
        const result = await authService.logoutUser(refreshToken); 
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en logout:", error); 
        res.status(error.status || 500).json({ message: error.message || "Error interno del servidor."})
    }
}

const me = async (req, res) => {
    try {
        
        const user = await authService.getUserById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error en /auth/me:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = {
    register,
    login,
    refresh, 
    logout, 
    me,
};
