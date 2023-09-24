const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const sendQuery = require('../db/connectToDB.js');
const { validateAdmin } = require('../schemas/admins.js');
const sendEmail = require('../helpers/sendEmail.js');

async function addAdmin (req, res) {

    try {
        // Validar los datos del administrador utilizando el esquema de validacion
        const result = validateAdmin(req.body);

        if (!result.success) {
            // Si la validacion no es correcta, enviamos error de validacion
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const { nombre, primer_apellido, segundo_apellido, email, pass } = result.data;

        //* Comprobar si el email ya existe en la base de datos
        const [adminEmail] = await sendQuery('SELECT * FROM admins WHERE email = ?', [email]);
        if (adminEmail) {
            return res.status(400).json({ error: 'El email ya existe.' });
        }

        //* Creamos un código de registro aleatorio
        const registrationCode = uuidv4();

        //* Enviar un email con tu código de registro.
        const subject = 'Activa tu usario en Accesibilizate 😃';
        const emailHTML = `
        <h1>¡Bienvenid@ a Accesibilízate ${nombre} ${primer_apellido}!</h1>
        <img src="https://picsum.photos/id/237/300/200">
        <p>Por favor, activa tu usuario haciendo clic en el siguiente enlace:</p>
        <a href="http://localhost:${process.env.PORT}/admin/activate/${registrationCode}">Activar tu usuario</a>
        `;
        
        await sendEmail(email, subject, emailHTML);

        //* Encriptamos la contraseña antes de almacenarla en la base de datos para guardarla de una forma más segura.
        const hashedPass = await bcrypt.hash(pass, 10);
        
        // Insertar el nuevo administrador en la base de datos
        const results = await sendQuery(`
            INSERT INTO admins (nombre, primer_apellido, segundo_apellido, email, pass, registration_code)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [nombre, primer_apellido, segundo_apellido, email, hashedPass, registrationCode]
        );

        // Respuesta exitosa
        console.log(registrationCode);
        res.status(200).json({ 
            admind_id: results.insertId,
            nombre,
            email,
            mensaje: 'Admin registrado con éxito.' 
        });

    } catch (error) {
        // Manejar cualquier otro error y mandarlo como respuesta
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } 
}

module.exports = addAdmin;