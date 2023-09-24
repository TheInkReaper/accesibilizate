// Inicializamos el proyecto
const express = require('express');
const app = express(); // Creamos el servidor
require('dotenv').config(); // Acceso a las variables de entorno
const PORT = process.env.PORT || 5000; // Puerto en el que escuchará el servidor

// Importamos las rutas y middlewares
const adminRouter = require('./routes/adminRouter.js');
const incidentRouter = require('./routes/incidentRouter.js');
const errorHandler = require('./middlewares/errorHandler.js');
const corsMiddleware = require('./middlewares/cors.js');
const handleNotFound = require('./middlewares/handleNotFound.js');

// Middlewares
app.use(express.json()); // Middleware para manejar JSON en las solicitudes
app.use(corsMiddleware); // Middleware para habilitar CORS (comentarado temporalmente)

// Rutas
// Ruta de registro en la tabla de administradores
app.use('/admin', adminRouter); // Registro de administradores
app.use('/incidents', incidentRouter); // Ruta para crear incidencias

// Middlewares de manejo de errores
app.use(errorHandler); // Manejador de errores personalizado
app.use(handleNotFound); // Manejador para rutas no encontradas

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
