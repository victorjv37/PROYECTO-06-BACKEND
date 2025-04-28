# API de Naruto - Aldeas y Personajes

## Instalación

npm install

## Uso

Ejecutar el servidor prod:

npm start

Ejecutar el servidor en modo desarrollo con nodemon:

npm run dev

### Semillas (Datos Iniciales)

npm run seed:import

npm run seed:delete


## Endpoints de la API

### Aldeas (Villages)

| Método | Ruta                         | Descripción                                                                 | Body Requerido | Notas                                                |
| :----- | :--------------------------- | :-------------------------------------------------------------------------- | :------------- | :--------------------------------------------------- |
| GET    | `/api/v1/villages`           | Obtiene una lista de todas las aldeas, incluyendo sus personajes.          | No             |                                                      |
| GET    | `/api/v1/villages/:id`       | Obtiene los detalles de una aldea específica por su ID, incluyendo personajes. | No             | Reemplaza `:id` con el ID de la aldea.               |
| POST   | `/api/v1/villages`           | Crea una nueva aldea.                                                       | Sí             | `{"name": "NombreAldea", "country": "País"}`      |
| PUT    | `/api/v1/villages/:id`       | Actualiza el nombre y/o país de una aldea existente.                      | Sí (parcial)   | `{"name": "NuevoNombre", "country": "NuevoPaís"}` |
| DELETE | `/api/v1/villages/:id`       | Borra una aldea existente y todos los personajes asociados a ella.       | No             | Reemplaza `:id` con el ID de la aldea a borrar.      |

### Personajes (Characters)

| Método | Ruta                                       | Descripción                                                                    | Body Requerido | Notas                                                               |
| :----- | :----------------------------------------- | :----------------------------------------------------------------------------- | :------------- | :------------------------------------------------------------------ |
| GET    | `/api/v1/characters`                       | Obtiene una lista de todos los personajes, incluyendo su aldea.              | No             |                                                                     |
| GET    | `/api/v1/villages/:villageId/characters` | Obtiene una lista de los personajes de una aldea específica.                   | No             | Reemplaza `:villageId` con el ID de la aldea.                       |
| GET    | `/api/v1/characters/:id`                   | Obtiene los detalles de un personaje específico por su ID, incluyendo su aldea. | No             | Reemplaza `:id` con el ID del personaje.                            |
| POST   | `/api/v1/villages/:villageId/characters` | Crea un nuevo personaje y lo asocia a una aldea existente.                  | Sí             | `{"name": "Nombre", "rank": "Rango", "clan": "Clan"}` | Reemplaza `:villageId` con el ID de la aldea. El `clan` es opcional. |
| PUT    | `/api/v1/characters/:id`                   | Actualiza los detalles de un personaje existente (nombre, rango, clan).        | Sí (parcial)   | No se puede cambiar la aldea (`village`) con este endpoint.         |
| DELETE | `/api/v1/characters/:id`                   | Borra un personaje existente y lo elimina de la lista de su aldea.           | No             | Reemplaza `:id` con el ID del personaje a borrar.                   |

**Notas Adicionales:**

*   El campo `rank` para los personajes debe ser uno de los siguientes valores: `'Academy Student', 'Genin', 'Chunin', 'Tokubetsu Jonin', 'Jonin', 'Anbu', 'Kage', 'Sannin', 'Missing-nin', 'Civilian', 'Other'`.
*   Al actualizar una aldea (PUT `/api/v1/villages/:id`), la lista de personajes (`characters`) no se modifica. La gestión de personajes se hace a través de los endpoints de personajes.
*   Al crear un personaje (POST `/api/v1/villages/:villageId/characters`), su ID se añade automáticamente a la lista de personajes de la aldea. Se evita la duplicación de IDs.
*   Al borrar un personaje (DELETE `/api/v1/characters/:id`), su ID se elimina automáticamente de la lista de personajes de la aldea.
*   Al borrar una aldea (DELETE `/api/v1/villages/:id`), todos los personajes asociados a ella también son eliminados de la base de datos. 