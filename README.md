# TaskFlow – Gestor de tareas

## 1. Sobre el proyecto

TaskFlow es una aplicación web que desarrollé para organizar tareas y llevar un control de las actividades pendientes y completadas.

La aplicación utiliza Vue 3 para mostrar la interfaz y Node.js con Express para gestionar los datos. Permite agregar nuevas tareas, consultar las existentes, marcar actividades como completadas y eliminarlas.

Los datos se guardan en un archivo JSON para conservar la información cuando se reinicia el servidor. También incorporé características PWA para permitir la instalación de la aplicación y ofrecer acceso a su interfaz cuando no hay conexión a Internet.

## 2. Tecnologías utilizadas

Para desarrollar el proyecto utilicé las siguientes tecnologías:

- Vue 3: desarrollo de la interfaz y componentes.
- JavaScript: programación de las funcionalidades.
- Vite: ejecución y compilación del frontend.
- Node.js: entorno de ejecución del backend.
- Express: creación de la API REST.
- HTML5 y CSS3: estructura y diseño de la aplicación.
- Fetch API: comunicación entre frontend y backend.
- JSON: almacenamiento de las tareas.
- Service Worker y Web App Manifest: configuración PWA.

## 3. Organización del proyecto

El proyecto está dividido en frontend y backend para mantener separadas las responsabilidades.

En el frontend se encuentran los siguientes componentes:

- **HomeView.vue:** controla las tareas y conecta los componentes con el servicio de la API.
- **TaskForm.vue:** contiene el formulario para agregar nuevas tareas.
- **TaskList.vue:** muestra las tareas y permite completarlas o eliminarlas.
- **TaskStats.vue:** presenta el total de tareas, las completadas y las pendientes.
- **tareasService.js:** reúne las funciones utilizadas para comunicarse con el servidor.

Por otro lado, el backend contiene las rutas de la API y la lógica para guardar, consultar, actualizar, eliminar y recuperar las tareas.

La información se almacena en el archivo `backend/tareas.json`.

## 4. Cómo ejecutar el proyecto

Para ejecutar TaskFlow es necesario tener instalado Node.js y npm.

### Ejecutar el frontend

Desde la carpeta principal del proyecto, abrir una terminal y ejecutar:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local donde se puede abrir la aplicación.

### Ejecutar el backend

Abrir una segunda terminal y ejecutar:

```bash
cd backend
node server.js
```

El servidor Express se ejecuta en:

`http://localhost:3000`

La dirección para consultar las tareas es:

`http://localhost:3000/api/tareas`

Es necesario mantener ambos servidores funcionando para utilizar todas las funciones de la aplicación.

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
- Mostrar mensajes de error cuando ocurre algún problema.
- Guardar los cambios en el archivo JSON.
- Consultar y modificar información mediante una API REST.
- Controlar las peticiones simultáneas y cancelar consultas GET anteriores cuando corresponde.

## 6. Estrategia de API y almacenamiento

El acceso a la API se centraliza en `tareasService.js`, utilizando Fetch API y validación de respuestas mediante `response.ok`.

El backend desarrollado con Express gestiona las operaciones CRUD y cuenta con una ruta adicional para recuperar tareas eliminadas.

Los datos se almacenan en un archivo JSON. De esta manera, las tareas se conservan aunque se reinicie el servidor.

## 7. Configuración PWA

También incorporé características PWA para que TaskFlow pueda instalarse como una aplicación.

Para ello configuré:

- Archivo `manifest.json`.
- Iconos de 192 × 192 y 512 × 512 píxeles.
- Registro de Service Worker.
- Instalación desde Google Chrome.
- Almacenamiento en caché de recursos básicos.
- Experiencia offline limitada.

El Service Worker utiliza Cache API para guardar recursos de la aplicación. Las respuestas de la API no se almacenan en caché, por lo que las operaciones con las tareas necesitan conexión con el backend.

## 8. Datos del proyecto

**Autor:** Alex Lupercio

**Universidad:** Universidad Politécnica Salesiana

**Asignatura:** Aplicaciones Web

**Unidad:** Unidad 3 – Programación del lado del cliente

**Proyecto:** TaskFlow

**Repositorio GitHub:** Pendiente de agregar.

**Demostración funcional:** Pendiente de publicar.