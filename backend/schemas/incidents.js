const z = require('zod');

// Para tener una plantilla en los admins

// Define un esquema de validacion para incidencias
const incidentSchema = z.object({
    titulo: z.string().min(5).max(20), // Campo titulo, entre 5-20 caracteres
    descripcion: z.string().max(50), // Campo descripcion, maximo de 50 caracteres
    ciudad: z.string({
        required_error: 'La ciudad es obligatoria' // Campo ciudad, requerido
    }),
    barrio: z.string({
        required_error: "El barrio es obligatorio" // Campo barrio, requerido
    })
});

// Funcion para validar una incidencia completa
function validateIncident (input) {
    return incidentSchema.safeParse(input);
}

// Funcion para validar una incidencia parcial
function validatePartialIncident (input) { // pendiente
    return incidentSchema.partial().safeParse(input);
}

// Importar funciones de validacion para usar en otros archivos
module.exports = { validateIncident, validatePartialIncident }