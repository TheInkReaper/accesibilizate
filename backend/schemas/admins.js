const z = require('zod');

// Para tener una plantilla en los admins

// Definir un esquema de validacion para administradores
const adminSchema = z.object({
    nombre: z.string().min(2).max(50), // Nombre entre 2-50 caracteres
    primer_apellido: z.string().min(2).max(50), // Primer apellido, entre 2-50 caracteres
    segundo_apellido: z.string().min(2).max(50).optional(), // Segundo apellido, entre 2-50 caracteres, opcional
    email: z.string().email({
        invalid_type_error: 'El email debe ser una direccion de correo valida', // Error en caso de que el email no sea valido
        required_error: 'El campo de email es obligatorio' // Error si el email no se rellena
    }),
    pass: z.string().min(6), // La contraseña debe tener como minimo 6 caracteres
});

//Funcion para validar administrador completo
function validateAdmin (input) {
    return adminSchema.safeParse(input);
}

// Funcion para validar un administrador parcial, para actualizaciones de datos
function validatePartialAdmin (input) { // pendiente
    return adminSchema.partial().safeParse(input);
}

module.exports = { validateAdmin, validatePartialAdmin }