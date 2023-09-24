// Importamos las dependencias necesarias
const express = require('express');
const router = express.Router();

// Importamos controladores y middlewares
const adminController = require('./controllers/adminController');
const loginController = require('./controllers/loginAdmin');
const NotFound = require('./NotFound');

// Rutas de ejemplo
router.get('/ruta-ejemplo', (req, res) => {
    res.json({ mensaje: 'Esta es una ruta de ejemplo' });
});

// Ruta que utiliza un middleware personalizado
router.get('/ruta-middleware', middleware, (req, res) => {
    res.json({ mensaje: 'Esta ruta usa middleware personalizado' });
});

// Ruta para iniciar sesión
router.post('/api/login', loginController.iniciarSesion);

// Manejo de rutas no encontradas
router.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: 'La ruta solicitada no se encuentra en el servidor.',
    });
});

module.exports = router;
