# Tamarindo-Tech-Proyecto

Repositorio para el Proyecto del Curso de Proyecto de Ingeniería de Software 1. Equipo Tamarindo Tech

## Descripción

Aplicación web desarrollada con Node.js, Express y MongoDB para la gestión de actividades, noticias, emprendimientos y usuarios en la comunidad de Tamarindo.

## Características principales

- Autenticación de usuarios y gestión de sesiones.
- Roles de usuario: usuario común, emprendedor y administrador.
- Gestión de actividades, noticias y emprendimientos.
- Vistas dinámicas con EJS.
- Conexión a base de datos MongoDB.

## Instalación

1. Clona el repositorio: (En caso de no tener el archivo del projecto, si lo tienes pasar al paso 2)
	```bash
	git clone https://github.com/arnaldo-chm/Tamarindo-Tech-Proyecto-Nuevo.git
	```
2. Instala las dependencias:
	```bash
	npm install
	```
3. Asegúrate de tener MongoDB corriendo en `mongodb://localhost:27017/TamarindoTech`.

4. Inicia la aplicación en modo desarrollo:
	```bash
	npm run dev
	```

## Estructura del proyecto

- `src/` - Código fuente principal (servidor Express, rutas, vistas y archivos estáticos).
- `models/` - Modelos de Mongoose para usuarios, noticias, actividades, etc.
- `views/` - Vistas EJS y HTML.
- `public/` - Archivos estáticos (CSS, JS, imágenes).

## Scripts

- `npm run dev` - Inicia el servidor con nodemon para desarrollo.

## Autor

Tamarindo Tech

## Usuario Administrador Default
correo: 'admin@tamarindo.com'
password: 'admin123'
