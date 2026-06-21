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

module.exports = {
    register,
    login,
};
