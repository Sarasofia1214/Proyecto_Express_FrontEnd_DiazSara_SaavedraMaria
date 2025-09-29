# RealFilms (antes KarenFlix) -  Gestor de Portafolio de Proyectos Freelance


<div align="center">
<h2>Introducción</h2>
</div>

RealFilms (nombre inicial KarenFlix) es una aplicación full-stack que permite a los usuarios registrar, calificar y rankear películas, animes y series geek.

El proyecto está dividido en backend (Node.js + Express + MongoDB) y frontend (HTML, CSS y JS puro).
Incluye autenticación con JWT, roles de usuario y administrador, validaciones robustas, documentación de endpoints con Swagger y manejo transaccional en MongoDB.


## Objetivos
- Implementar un sistema de gestión de usuarios con autenticación segura.
- Permitir a los usuarios crear reseñas, calificar y reaccionar (likes/dislikes).
- Gestionar películas y categorías con control de administrador.
- Calcular un ranking ponderado de películas basado en calificaciones, popularidad y reacciones.
- Desarrollar un frontend amigable, conectado al backend mediante API REST.

## Tecnologías usadas
-Backend: Node.js, Express, MongoDB (driver oficial), JWT, bcrypt, dotenv, express-rate-limit, express-validator, swagger-ui-express, passport-jwt, semver.

-Frontend: HTML, CSS y JavaScript puro.
Gestión del proyecto: GitHub, metodología SCRUM.
## Estructura del proyecto

```
.
├── html
│   ├── createAccount.html
│   ├── inicioAdmin.html
│   ├── inicioUser.html
│   └── usuariosAdmin.html
├── script
│   ├── createAccount.js
│   ├── inicioAdmin.js
│   ├── inicioUser.js
│   ├── login.js
│   └── usuarios.js
├── storage
│   ├── font/
│   └── img/
├── styles
│   ├── index.css
│   ├── inicioAdmin.css
│   └── inicioUser.css
└── index.html
```

⚙️ Instalación y ejecución
Backend
Clonar el repositorio:
git clone <url-del-repo-backend>

Instalar dependencias:
npm install

Configurar variables de entorno en .env:
PORT=4000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=supersecret
JWT_EXPIRE=1d

Ejecutar en modo desarrollo:
npm run dev

Frontend
Clonar el repositorio:
git clone <url-del-repo-frontend>

Abrir index.html en el navegador.
📖 Documentación de la API

La API está documentada con Swagger.
Al ejecutar el backend, acceder en:

http://localhost:4000/api-docs

# Endpoints principales
```
Usuarios
POST /api/v1/auth/register → Registrar usuario
POST /api/v1/auth/login → Iniciar sesión
GET /api/v1/usuarios → Listar usuarios (admin)
Películas
POST /api/v1/peliculas → Crear película (admin)
GET /api/v1/peliculas → Listar todas las películas
GET /api/v1/peliculas/:id → Ver detalle de una película
Reseñas
POST /api/v1/reseñas → Crear reseña
GET /api/v1/reseñas/:id_pelicula → Listar reseñas de una película
PUT /api/v1/reseñas/:id → Editar reseña
DELETE /api/v1/reseñas/:id → Eliminar reseña
Reacciones
POST /api/v1/reacciones → Dar like/dislike
GET /api/v1/reacciones/:id_pelicula → Obtener reacciones de película
```

## Principios aplicados
Arquitectura modular y escalable.
Validaciones en endpoints con express-validator.
Manejo de errores centralizado.
Versionado de la API con semver.
Consistencia garantizada con transacciones en MongoDB.
Documentación interactiva con Swagger.

## SCRUM
[Documento SCRUM](./storage/Planeacion_Del_Proyecto.docx.pdf)
## Video Explicación 
