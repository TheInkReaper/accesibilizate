// Middleware para manejar errores
function errorHandler(err, req, res, next) {
    // Registra el error en la consola para fines de depuración
    console.error(err.stack);
    
    // Envía una respuesta de error con un estado HTTP 500 (Error interno del servidor)
    res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ha ocurrido un error en el servidor.',
    });
}

module.exports = errorHandler;
