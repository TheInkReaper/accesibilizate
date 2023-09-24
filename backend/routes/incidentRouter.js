const express = require('express');
const incidentRouter = express.Router();

// Importar controladores y middleware de autentificacion
const addIncident = require('../controllers/addIncident.js');
const authAdmin = require('../middlewares/authAdmin.js');

// Ruta para agregar una incidencia (requiere autentificacion de administrador)
incidentRouter.post('/', authAdmin, addIncident);

// Manejo de errores 404 para rutas no encontradas
incidentRouter.use('*',(req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: 'La ruta solicitada no se encuentra en el servidor.',
    });
});

module.exports = incidentRouter;