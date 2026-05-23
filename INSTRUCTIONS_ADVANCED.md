# Requerimientos de Integraciones Avanzadas

Para que las nuevas funciones (Calendar y Blog) funcionen correctamente, debes agregar estas variables a tus archivos `.env`.

### Backend (`server/.env`)
*   `GOOGLE_CALENDAR_ID`: El ID del calendario de Google de Gustavo (ej. `tu-correo@gmail.com`).
*   `GOOGLE_SERVICE_ACCOUNT_JSON`: El contenido completo (en una sola línea o escapado) del archivo JSON de la Service Account que descargues de Google Cloud Console.
*   `BACKEND_URL`: URL base de tu servidor (ej. `http://localhost:5000` o tu dominio real).
*   `FRONTEND_URL`: URL base de tu web (ej. `http://localhost:5173` o tu dominio real).

### Frontend (`.env`)
*   `VITE_GHOST_API_URL`: La URL de tu servidor Ghost CMS.
*   `VITE_GHOST_CONTENT_API_KEY`: Tu Content API Key de Ghost.

---

### Pasos para Google Calendar:
1. Crea un proyecto en [Google Cloud Console](https://console.cloud.google.com/).
2. Habilita la "Google Calendar API".
3. Crea una "Service Account" y descarga la llave en formato JSON.
4. **IMPORTANTE:** Comparte el calendario de Gustavo con el correo de la Service Account (ej. `mi-app@proyecto.iam.gserviceaccount.com`) dándole permisos de "Ver todos los detalles".
