
# TaskFlow – Gestor de tareas

## 1. Sobre el proyecto

TaskFlow es una aplicación web que desarrollé para organizar tareas y llevar un control de las actividades pendientes y completadas.

La aplicación utiliza Vue 3 para mostrar la interfaz y Node.js con Express para gestionar los datos. Permite agregar nuevas tareas, consultar las existentes, marcar actividades como completadas, eliminarlas y recuperarlas mediante la opción «Deshacer».

Los datos se almacenan en un archivo JSON. En el entorno local, los cambios se conservan aunque se reinicie el servidor. En la versión publicada en Render, el almacenamiento es temporal y los datos pueden restablecerse cuando se reinicia o vuelve a desplegar el servicio.

También incorporé características PWA para permitir la instalación de la aplicación y ofrecer acceso a su interfaz cuando no hay conexión a Internet.

## 2. Tecnologías utilizadas

Para desarrollar el proyecto utilicé las siguientes tecnologías:

- Vue 3: desarrollo de la interfaz y componentes.
- JavaScript: programación de las funcionalidades.
- Vite: ejecución y compilación del frontend.
- Vue Router: navegación entre las vistas de la aplicación.
- Node.js: entorno de ejecución del backend.
- Express: creación de la API REST.
- HTML5 y CSS3: estructura y diseño de la aplicación.
- Fetch API: comunicación entre frontend y backend.
- JSON: almacenamiento de las tareas.
- Service Worker y Web App Manifest: configuración PWA.
- Git y GitHub: control de versiones y repositorio.
- Vercel: publicación del frontend.
- Render: publicación del backend.

## 3. Organización del proyecto

El proyecto está dividido en frontend y backend para mantener separadas las responsabilidades.

En el frontend se encuentran los siguientes archivos y componentes:

- **HomeView.vue:** controla las tareas y conecta los componentes con el servicio de la API.
- **AboutView.vue:** muestra información general sobre la aplicación.
- **TaskForm.vue:** contiene el formulario para agregar nuevas tareas.
- **TaskList.vue:** muestra las tareas y permite completarlas o eliminarlas.
- **TaskStats.vue:** presenta el total de tareas, las completadas y las pendientes.
- **tareasService.js:** reúne las funciones utilizadas para comunicarse con el servidor.
- **router/index.js:** configura la navegación entre las vistas.

Por otro lado, el backend contiene las rutas de la API y la lógica para guardar, consultar, actualizar, eliminar y recuperar tareas.

La información se almacena en el archivo `backend/tareas.json`.

## 4. Cómo ejecutar el proyecto

Para ejecutar TaskFlow es necesario tener instalado Node.js y npm.

### Ejecutar el backend

Desde la carpeta principal del proyecto, abrir una terminal y ejecutar:

```bash
cd backend
npm install
node server.js
```

El servidor Express se ejecuta en:

http://localhost:3000

La dirección para consultar las tareas es:

http://localhost:3000/api/tareas

### Ejecutar el frontend

Abrir una segunda terminal desde la carpeta principal del proyecto y ejecutar:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local donde se puede abrir la aplicación.

Es necesario mantener ambos servidores funcionando para utilizar todas las funciones de la aplicación en el entorno local.

## 5. Funcionalidades

Durante el desarrollo implementé las siguientes funciones:

- Agregar nuevas tareas.
- Mostrar las tareas registradas.
- Marcar tareas como completadas o pendientes.
- Eliminar tareas.
- Recuperar tareas eliminadas mediante el botón «Deshacer», disponible durante 5 segundos.
- Conservar el ID, título y estado original al recuperar una tarea.
- Actualizar automáticamente las estadísticas.
- Validar que no se ingresen tareas vacías.
- Mostrar notificaciones temporales al agregar, completar y eliminar tareas.
- Mostrar estados de carga, error y lista vacía.
- Permitir reintentar una consulta cuando ocurre un error.
- Guardar los cambios en el archivo JSON.
- Consultar y modificar información mediante una API REST.
- Controlar las peticiones simultáneas y cancelar consultas GET anteriores cuando corresponde.
- Navegar entre las secciones Inicio y Acerca de.
- Instalar la aplicación como PWA desde un navegador compatible.

## 6. Estrategia de API y almacenamiento

El acceso a la API se centraliza en `src/services/tareasService.js`, utilizando Fetch API y validación de respuestas mediante `response.ok`.

El backend desarrollado con Express gestiona las operaciones CRUD mediante los siguientes endpoints:

- `GET /api/tareas`: consultar las tareas.
- `POST /api/tareas`: crear una nueva tarea.
- `PUT /api/tareas/:id`: actualizar una tarea.
- `DELETE /api/tareas/:id`: eliminar una tarea.
- `POST /api/tareas/restaurar`: recuperar una tarea eliminada.

El frontend utiliza una variable de entorno llamada `VITE_API_URL` para conectarse con la API publicada. Cuando esta variable no está configurada, utiliza la dirección local del servidor.

Los datos se almacenan en un archivo JSON. Este sistema permite mantener la información entre reinicios en el entorno local.

En Render, el almacenamiento del archivo es temporal y no garantiza la conservación de los cambios después de reinicios o nuevos despliegues. Esta es una limitación de la versión publicada.

Para evitar problemas durante las peticiones HTTP, se implementaron controles para cancelar consultas anteriores y evitar que respuestas antiguas reemplacen información más reciente.

## 7. Configuración PWA

También incorporé características PWA para que TaskFlow pueda instalarse como una aplicación.

Para ello configuré:

- Archivo `public/manifest.json`.
- Iconos de 192 × 192 y 512 × 512 píxeles.
- Registro de Service Worker.
- Instalación desde Google Chrome.
- Almacenamiento en caché de recursos básicos.
- Experiencia offline limitada.

El Service Worker utiliza Cache API para guardar recursos de la aplicación y permitir que la interfaz pueda abrirse sin conexión cuando esos recursos están disponibles en caché.

Las respuestas de la API no se almacenan en caché, por lo que consultar o modificar tareas requiere conexión con el backend.

## 8. Publicación y pruebas

Publiqué el frontend en Vercel y el backend en Render, conectándolos mediante la variable de entorno `VITE_API_URL`.

Realicé pruebas de las operaciones principales de la API, incluyendo la creación, consulta, actualización, eliminación y recuperación de tareas.

También comprobé el funcionamiento de la aplicación publicada, la actualización de las estadísticas y el comportamiento de la interfaz cuando no existe conexión a Internet.

Las capturas de las pruebas realizadas se encuentran en la carpeta `evidencias` del repositorio.

## 9. Datos del proyecto

**Autor:** Alex Lupercio

**Universidad:** Universidad Politécnica Salesiana

**Asignatura:** Aplicaciones Web

**Unidad:** Unidad 3 – Programación del lado del cliente

**Proyecto:** TaskFlow

**Repositorio GitHub:** https://github.com/Alexlupercio/taskflow

**Demostración funcional:** https://taskflow-blush-omega-89.vercel.app/

**API publicada:** https://taskflow-api-r6qy.onrender.com/api/tareas
