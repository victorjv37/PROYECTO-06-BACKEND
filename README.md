# API de personajes de Naruto !!!!!!!!!!

## USO

1.  npm install
2.  Configura tu .env con las variables:
    MONGO_URI=tu_url_de_mongodb

3.  Llena la base de datos con personajes y aldeas

    - Para importar los datos de ejemplo:
      npm run seed:import
    - Si quieres borrar todos los datos:
      npm run seed:delete

4.  Arranca el servidor
    npm run dev
    o
    npm start

## Rutas disponibles

### Aldeas (Villages)

- `GET /api/v1/villages`  
  Ver todas las aldeas
- `GET /api/v1/villages/:id`  
  Ver una aldea por su ID
- `POST /api/v1/villages`  
  Crear una nueva aldea
- `PUT /api/v1/villages/:id`  
  Editar una aldea
- `DELETE /api/v1/villages/:id`  
  Borrar una aldea
- `GET /api/v1/villages/:villageId/characters`  
  Ver todos los personajes de una aldea
- `POST /api/v1/villages/:villageId/characters`  
  Crear un personaje en una aldea

### Personajes (Characters)

- `GET /api/v1/characters`  
  Ver todos los personajes
- `GET /api/v1/characters/:id`  
  Ver un personaje por su ID
- `POST /api/v1/characters`  
  Crear un personaje (requiere indicar el ID de la aldea)
- `PUT /api/v1/characters/:id`  
  Editar un personaje
- `DELETE /api/v1/characters/:id`  
  Borrar un personaje
