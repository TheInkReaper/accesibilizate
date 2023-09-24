const nodemailer = require('nodemailer');
require('dotenv').config();


// Creamos el "transporte" para enviar correos electronicos con nodemailer
const transport = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Cambiar segun proveedor
    port: 587, // Cambiar segun puerto usado, si fuera necesario
    auth: {
        user: process.env.SMTP_USER, // Usar variables de entorno para ocultar credenciales
        pass: process.env.SMTP_PASSWORD
    },
});

// Creamos la función que enviará los emails
async function sendEmail (email, subject, emailHtml) {
    console.log('Entra en sendEmail');
    // Primero definimos las opciones del eail que se va a enviar
    const emailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject,
        html: emailHtml,
    };

    try {
        // y lo intentamos enviar con el transporte que hemos creado arriba.
        console.log('Va a enviar el email');
        await transport.sendMail(emailOptions);
        console.log('Correo electronico enviado correctamente');
    } catch (error) {
        console.log('Error al enviar el correo electronico');
        console.log(error.message);
        throw new Error(error);
    }
}

module.exports = sendEmail;
