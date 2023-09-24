const express = require('express');
const adminRouter = express.Router();

// Importar controladores para administradores
const addAdmin = require('../controllers/addAdmin.js');
const loginAdmin = require('../controllers/loginAdmin.js');
const activateAdmin = require('../controllers/activateAdmin.js');

// pendiente de añadir una pagina de inicio antes de descomentar
/* adminRouter.get('/', (req, res) => {
    res.send(`<h1>bienbenid@ a la API</h1>`);
    console.log('test');
}); */

// Ruta para activar administradores mediante codigo de registro
adminRouter.get('/activate/:registrationCode', activateAdmin);

// Ruta para registrar nuevos administradores
adminRouter.post('/', addAdmin );

// Ruta para iniciar sesion de administradores
adminRouter.post('/login', loginAdmin);

//Manerjo de errores 404 para rutas no encontradas 
adminRouter.use('*',(req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: 'La ruta solicitada no se encuentra en el servidor.',
    });
});

module.exports = adminRouter