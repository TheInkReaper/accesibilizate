const cors = require('cors');

const ACCEPTED_ORIGINS = [
  // Ejemplos de sitios donde se acepta la conexión
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com'
];

// Middleware para configurar las políticas CORS
function corsMiddleware() {
  return cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        // Si el origen de la solicitud está en la lista de aceptados, se permite la conexión.
        return callback(null, true);
      }

      if (!origin) {
        // Si no se especifica un origen (como en solicitudes locales), se permite la conexión.
        return callback(null, true);
      }

      // Si el origen no está en la lista, se rechaza la conexión con un error CORS.
      return callback(new Error('Not allowed by CORS'));
    }
  });
}

module.exports = corsMiddleware;
