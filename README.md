# Proyecto Ciudad más accesible

Ciudad Más Accesible o, temporalmente Accesibilizate, es una aplicación que permite a usuarios informarse de los problemas de accesibilidad en su ciudad y barrio, sean estas a pie o en vehículo, que publicarán usuarios verificados dentro de la misma app.

De este modo, mientras unos pocos usuarios con permisos pueden recoger y publicar información relevante, con contenido detallado, el resto de usuarios podrán buscar por filtros relevantes estas incidencias, y luego en caso de querer podrán votar las incidencias para hacerlas destacar por encima de otras, en función de lo que los usuarios consideren más importante para cada cual.

/*
  remarcar los pasos para descargar el proyecto, instalar las dependencias, configurar las variables del entorno mediante el archivo .env, y entonces se puede iniciar el servidor con npm start
*/

La API esta disponible en http://localhost:3000, mediante navegador o usando Postman para poner a prueba los endpoints.

  Inicializar el proyecto:
* npm init o bien npm i -y

  Usaremos express
* npm i express

## ENDPOINTS
· 'GET /api/incidencias': Obtiene la lista de incidencias por barrio
· 'POST /api/incidencias': Crea una nueva incidencia
· 'PUT /api/incidencias/:id': Marca una incidencia como resuelta
· 'POST /api/registro': Registra un nuevo usuario
· 'POST /api/login': Inicio de sesión de un usuario
· 'GET /api/admin': Obtiene la información del administrador autenticado 
· 'GET api/admin/incidencias': Obtiene la lista de todas las incidencias