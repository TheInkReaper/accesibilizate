const jwt = require('jsonwebtoken');

// Middleware para autenticar a los administradores
async function authAdmin(req, res, next) {
    console.log('Entra en authAdmin');

    // Mirar si el usuario que está haciendo esto es un usuario autorizado.

    // Primero miramos si se ha proporcionado la cabecera 'x-access-token'
    const { 'x-access-token': token } = req.headers;
    console.log(req.headers);

    if (!token) {
        // Si no se proporciona un token, devuelve un error de autenticación (401).
        return res.status(401).json({ error: 'No autenticado.' });
    }

    // Comprobamos con JWT si el token proporcionado es válido y obtenemos la información del administrador.
    let infoAdmin;
    try {
        infoAdmin = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        // Si el token no es válido, devuelve un error de token inválido (401).
        return res.status(401).json({ error: 'Token inválido' });
    }

    // Si llegamos hasta aquí, significa que la autenticación fue exitosa y tenemos la información del administrador en req.admin.
    req.admin = infoAdmin;

    // Llama a la función next() para pasar al siguiente middleware.
    next();
}

module.exports = authAdmin;
