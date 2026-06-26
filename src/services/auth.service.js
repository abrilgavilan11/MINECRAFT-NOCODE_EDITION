const prisma = require("../prisma/prismaClient.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require("react");

const registerUser = async (data) => {
  const { name, email, password } = data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw { status: 409, message: "El email ya está registrado." };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

const loginUser = async (data) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw { status: 401, message: "Credenciales inválidas." };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw { status: 401, message: "Credenciales inválidas." };
  }

  // Generamos Token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "secreto_de_respaldo_por_si_acaso",
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    {userId: user.id}, 
    process.env.JWT_REFRESH_SECRET || "secreto_de_refresh_por_si_acaso", 
    {expiresIn: "7d"}
  )

  const expiresAt = new Date(); 
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken, 
      userId: user.id, 
      expiresAt
    }
  })

  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshAccessToken = async (refreshToken) => {
  if(!refreshToken){
    throw { status: 400, message: "Refresh token es requerido."};
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: {token: refreshToken},
  })

  if(!storedToken){
    throw {status: 401, message: "Refresh token invalido."}
  }

  if(new Date() > storedToken.expiresAt){
    await prisma.refreshToken.delete({where: {id: storedToken.id}}); 
    throw {status: 401, message: "Refresh token expirado."}
  }

  try {
    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || "secreto_de_refresh_por_si_acaso"
    )

    const newToken = jwt.sign(
      {userId: decoded.userId}, 
      process.env.JWT_SECRET || "secreto_de_respaldo_por_si_acaso", 
      {expiresIn: "15m"}
    )

    return { token: newToken}
  } catch (error) {
    throw {status: 403, message: "Token invalido."}
  }
}

const logoutUser = async (refreshToken) => {
  if(!refreshToken){
    throw {status: 400, message: "Refresh token es requerido."}; 
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: {token: refreshToken},
  })

  if(storedToken){
    await prisma.refreshToken.delete({
      where: {id: storedToken.id}
    })
  }

  return {message: "Sesión cerrada correctamente."}
}

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserById,
};
