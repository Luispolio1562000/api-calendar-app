# API Calendar App

## Configuración del entorno

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` basado en `.env.template`:
   ```
   cp .env.template .env
   ```
4. Edita el archivo `.env` con tus propias variables de entorno y credenciales
5. Ejecuta el servidor en modo desarrollo: `npm run dev`
6. Ejecuta el servidor en modo producción: `npm start`

## Variables de entorno requeridas

- `PORT`: Puerto donde se ejecutará el servidor (por defecto: 3000)
- `DB_CNN`: URL de conexión a MongoDB
- `DB_NAME`: Nombre de la base de datos
- `MONGO_USER`: Usuario de MongoDB
- `MONGO_PASSWORD`: Contraseña de MongoDB
- `SECRET_KEY`: Clave secreta para firmar los JWT
