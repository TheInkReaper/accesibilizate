const sendQuery = require('../db/connectToDB.js');
const validateActivation = require('../schemas/activate.js');

async function activateUser (req, res, next) {
    console.log('Entra en activateUser');

    //* 1. Validar el tipo de dato que nos pasan
    let registrationCode;

    try {
        registrationCode = await validateActivation(req.params.registrationCode);
        console.log('Código de registro validado:', registrationCode.data);
    } catch (error) {
        // Si el codigo de registro no es un UUID valido, devuelve error 400
        return res.status(400).json({ error: 'El código de registro no es válido' });
    }

    //* 2. Una vez todo validado, comprobamos que ese código de registro esté en la BBDD
    try {
        console.log('Validando el codigo de registro');
        const [admin] = await sendQuery(
            `SELECT * FROM admins WHERE registration_code = ?` , [registrationCode.data]
            );
        console.log('Resultado de la búsqueda en la base de datos:', admin);
        
        // En caso de no existir el codigo, lanzamos error 404
        if (!admin) {
            console.log('El código de registro no existe en la base de datos');
            return res.status(404).json({ error: 'El código de registro no existe' });
        }

        // En caso de existir, actualizamos el usuario a activo (isActive = true)
        console.log('Actualizando el estado del usuario a activo');
        await sendQuery(
            `UPDATE admins SET registration_code = null, isActive = true, modified_at = ? WHERE registration_code = ?`,
            [new Date(), registrationCode.data]
        );

        // Mensaje de exito
        return res.status(200).json({
            ok: true,
            data: null,
            error: null,
            message: 'El usuario se ha activado correctamente.'
        });

    } catch (error) {
        // Si ocurre un error durante el proceso, se maneja y transfiere al siguiente middleware
        return next(error);
    }

}

module.exports = activateUser;
