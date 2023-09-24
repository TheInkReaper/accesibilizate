const z = require('zod');

// Define un esquema de validacion para el codigo de activacion UUID
const activateSchema = z.string().uuid();

//Funcion para validar el codigo de activacion
function validateActivation (input) {
    return activateSchema.safeParse(input);
}

module.exports = validateActivation;