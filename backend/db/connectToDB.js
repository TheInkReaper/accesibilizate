// Tenemos que pasarle la ruta de nuestra base de datos, en este caso la tenemos
// en localhost, si la tuvieramos en otro sitio desplegado habría que pasarle esa
// ruta.

const mysql = require('mysql2/promise');
require('dotenv').config();

// Creamos el objeto de configuración para conectarnos a la BBDD
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    timezone: 'local'
};

async function connectToDBPool () {
    let pool;

    try {
        if (!pool) {
            pool = await mysql.createPool(dbConfig); // Aqui se crea la conexion si no existia.
        }
        return await pool.getConnection(); // Esto es lo que realmente se conecta a la bbdd
    } catch (error) {
        throw new Error(error.message);
    }
}

async function sendQuery (query, values) {
    let connection;
    try {
        connection = await connectToDBPool();
        const [results] = await connection.query(query, values);
        return results;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = sendQuery; 
