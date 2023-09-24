
DROP DATABASE IF EXISTS ciudad_accesible;
CREATE DATABASE ciudad_accesible;

USE ciudad_accesible;

DROP TABLE IF EXISTS admins;
CREATE TABLE IF NOT EXISTS admins (
	admin_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    registration_code varchar(100) DEFAULT NULL,
    isActive tinyint(1) DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    modified_at datetime DEFAULT NULL
);

DROP TABLE IF EXISTS incidencias;
CREATE TABLE IF NOT EXISTS incidencias (
	incidencia_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    barrio VARCHAR(100) NOT NULL,
    foto BLOB,
    done BOOLEAN,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    admin_id INT NOT NULL,

    CONSTRAINT fk_admin_incidencia
    FOREIGN KEY (admin_id) REFERENCES admins (admin_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

/* tabla usuarios anónimos, no se les requiere más info que un alias */

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    alias VARCHAR(50) NOT NULL
);

/* tabla resultante de la interacción de usuarios a las incidencias, por ejemplo comentarios a estas */

DROP TABLE IF EXISTS comentarios;
CREATE TABLE IF NOT EXISTS comentarios (
	user_id INT NOT NULL ,
	incidencia_id INT NOT NULL ,
    created_at datetime NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, incidencia_id, created_at),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (incidencia_id) REFERENCES incidencias (incidencia_id) ON DELETE CASCADE ON UPDATE CASCADE
);



