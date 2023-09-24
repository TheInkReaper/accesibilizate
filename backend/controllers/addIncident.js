require('dotenv').config();
const sendQuery = require('../db/connectToDB');
const { validateIncident, validatePartialAdmin } = require('../schemas/incidents.js');

// Define la funcion asincronica para agregar una incidencia
async function addIncident (req, res, next) {
    console.log('Entra en addIncident')

    // Extraer la ID del administrador desde req.admin
    console.log(req.body)

    const { admin_id } = req.admin;

    try {
        // Validar la entrada usando el esquema de validacion de incidencia
        const result = validateIncident(req.body);

        console.log('Valida en el try');
        if (!result.success) {
            // Si la validacion no es correcta, devuelve error de validacion
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        // Extraer campos de la solicitud
        const { titulo, descripcion, ciudad, barrio } = req.body;
        console.log('Previo al sendQuery');

        // Ejecutar una consulta para guardar la incidencia en la base de datos
        await sendQuery(`
            INSERT INTO incidencias
            (titulo, descripcion, ciudad, barrio, admin_id)
            VALUES (?, ?, ?, ?, ?);
            `, [titulo, descripcion, ciudad, barrio, admin_id]
        );
        console.log('Después del sendQuery');

        // Enviar una respuesta de exito
        res.status(200).send({
            ok: true,
            data: null,
            error: null,
            message: 'Entrada de incidencia creada correctamente.'
        });

    } catch (error) {
        // Manejar errores y enviarlos al siguiente middleware
        return next(error);
    }

}

module.exports = addIncident;
