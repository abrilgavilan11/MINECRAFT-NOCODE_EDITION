<h2 align="center">Desarrollado para la materia: Programación Web Avanzada - UNCo</h2>
<div align="center">
  <img src="./public/img/hero-minecraft.png" alt="Minecraft NoCode Edition Banner" width="600">
</div>

# 🧱 Minecraft NoCode Edition - Backend API

Esta es la API REST desarrollada con Node.js, Express, Prisma ORM y PostgreSQL (hosteada en Supabase) para dar soporte a la aplicación web "Minecraft NoCode Edition". Este proyecto permite persistir los datos reales de la aplicación, gestionar cuentas de usuario, y proteger las rutas administrativas.

## 👥 Integrantes del Grupo
| Rol | Nombre | GitHub |
| :--- | :--- | :--- |
| PM / Scrum Master | Abril Gavilan | @abrilgavilan11 |
| Backend Developer | Daniela Oñatibia | @DanielaOnatibia |
| Backend Developer | Erick Gonzalez | @DevEriik |

## 🔗 Enlaces del Proyecto
* **Repositorio Frontend:** https://github.com/DevEriik/MINECRAFT---NoCode-Edition
* **Repositorio Backend:** https://github.com/abrilgavilan11/MINECRAFT-NOCODE_EDITION
* **Tablero Kanban:** https://github.com/users/abrilgavilan11/projects/3
* **Deploy Frontend:** https://minecraft-nocode-edition.vercel.app/
* **Deploy Backend:** https://minecraft-nocode-edition-sage.vercel.app

## 🎮 Descripción de la Aplicación
Minecraft NoCode Edition es una plataforma orientada a la comunidad técnica y creativa de Minecraft. Cuenta con herramientas como un creador de skins 2D y un directorio de ítems del juego, facilitando la gestión de recursos sin necesidad de programar.

## 📦 Entidades Elegidas
Para soportar todas las funcionalidades del sistema, modelamos las siguientes entidades en nuestra base de datos relacional:
* **Mobs e Items:** Entidades principales del juego. Contienen la información pública y traducciones.
* **Users:** Gestión de cuentas de usuario con control de roles (`CLIENT` y `ADMIN`) y contraseñas encriptadas.
* **Favorites:** Relación que permite a los usuarios guardar Mobs e Items personalizados en su perfil.

## ✨ Características Principales
* 🔒 **Seguridad y Autenticación:** Implementación de JWT (JSON Web Tokens) para el manejo seguro de sesiones de usuarios.
* 👥 **Control de Roles (RBAC):** Middlewares personalizados (`verifyToken`, `verifyAdmin`) para restringir el acceso a rutas sensibles (crear, editar, eliminar) solo a usuarios administradores.
* 🔑 **Encriptación:** Uso de `bcrypt` para el almacenamiento seguro de contraseñas.
* 🗄️ **Base de Datos Relacional:** Uso de PostgreSQL (Supabase) para persistencia real.
* 🏗️ **ORM Moderno:** Esquemas, relaciones y migraciones gestionadas 100% con Prisma.
* 🌐 **CORS Configurado:** Comunicación fluida y segura con el frontend.
* 🚀 **Arquitectura Limpia:** Separación de responsabilidades en controladores, servicios, middlewares y rutas.

## 🛠️ Tecnologías Utilizadas
* Node.js & Express
* Prisma ORM
* PostgreSQL (Supabase)
* JSON Web Token (JWT)
* Bcrypt

---

## ⚙️ Configuración del Entorno (.env)

Para que el servidor funcione correctamente (especialmente el sistema de login y seguridad), es estrictamente necesario configurar las variables de entorno locales.

1. Duplica el archivo `.env.example` y renómbralo a `.env`.
2. Completa las variables con tus datos locales.

El archivo `.env` debe tener la siguiente estructura:

```env
# Puerto donde correrá el servidor local
PORT=3000

# URL de conexión a la base de datos de Supabase (PostgreSQL)
DATABASE_URL="postgresql://usuario:password@host:puerto/basededatos?pgbouncer=true"

# Clave secreta para firmar los JSON Web Tokens (JWT)
JWT_SECRET="aqui_va_tu_clave_secreta_super_segura"
```

### ⚠️ Importante sobre JWT_SECRET:

Esta variable es crucial para la seguridad de la aplicación. En desarrollo, puedes usar cualquier cadena de texto difícil de adivinar. Nunca subas el archivo .env al repositorio.

---

## 🛠️ Instrucciones de Instalación y Ejecución

Sigue estos pasos para correr el entorno de desarrollo localmente

1. Clonar este repositorio:
   ```bash
    git clone https://github.com/abrilgavilan11/MINECRAFT-NOCODE_EDITION.git
   ```

2. Instalar las dependencias:  
    ```bash
        npm install
    ```

3. Levantar el servidor en modo desarrollo:  
    ```bash
        npm run dev
    ```

4. Levantar el servidor en modo producción:  
    ```bash
        npm start
    ```

## 🗄️ Base de Datos (Supabase): Migraciones y Seed
Este proyecto utiliza Prisma ORM para el modelado y la conexión con la base de datos alojada en Supabase. Para inicializar la base de datos remota con la estructura y los datos, ejecuta los siguientes comandos:

1. Ejecutar las migraciones:

```bash
    npx prisma migrate dev
```

2. Ejecutar el seed:
Esto poblará la base de datos de Supabase con un set de datos iniciales de prueba.

```bash
    npx prisma db seed
```
