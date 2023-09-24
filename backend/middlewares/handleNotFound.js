// Middleware para manejar solicitudes a rutas no encontradas
const handleNotFound = (req, res) => {
  // Envía una respuesta con un estado HTTP 404 (No encontrado) y un mensaje de error
  res.status(404).send({ status: "error", message: "Not found" });
};

module.exports = handleNotFound;
