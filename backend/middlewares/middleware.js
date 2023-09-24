const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar el middleware para manejar errores
const errorHandler = require('./errorHandler');

const app = express();

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para manejar errores
app.use(errorHandler);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

module.exports = app;
