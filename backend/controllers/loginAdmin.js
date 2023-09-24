const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendQuery = require('../db/connectToDB.js');
const { validateAdmin, validatePartialAdmin } = require('../schemas/admins.js');

async function loginAdmin(req, res, next) {
    const { email, pass } = req.body;

    // Encriptamos la contraseña proporcionada por el usuario
    const hashedPass = await bcrypt.hash(pass, 10);

    try {
        // Consultamos la base de datos para obtener la información del administrador
        const [result] = await sendQuery(
            `SELECT * FROM admins WHERE email = ?`,
            [email]
        );

        // Si no se encuentra ningún registro con el correo proporcionado, devolvemos un error 401
        if (!result) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Comparamos la contraseña encriptada con la de la base de datos
        const passwordMatch = await bcrypt.compare(pass, result.pass);

        // Si las contraseñas no coinciden, devolvemos un error 401
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generamos un nuevo token para el administrador
        const adminInfo = {
            admin_id: result.admin_id,
            nombre: result.nombre
        };

        const token = jwt.sign(adminInfo, process.env.JWT_SECRET, { expiresIn: '1w' });

        // Enviamos el token en las cabeceras de la respuesta
        res.header({ 'x-access-token': token });

        res.send({
            ok: true,
            data: token,
            mensaje: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = loginAdmin;
