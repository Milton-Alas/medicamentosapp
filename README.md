# MediGest - Sistema de Gestión de Medicamentos


## 📋 Descripción

MediGest es una aplicación web diseñada para la gestión eficiente de inventarios de medicamentos y generación de recetas médicas. Permite a los usuarios registrar, editar, visualizar y eliminar medicamentos, así como crear recetas médicas en formato PDF.

![Login Screen](https://github.com/Milton-Alas/medicamentosapp/blob/main/images_funcionalidad/login.png)

## ✨ Características

- **Sistema de autenticación**: Control de acceso seguro mediante usuario y contraseña
- **Gestión completa de medicamentos**:
  - Registro de nuevos medicamentos
  - Visualización en formato de tabla con paginación
  - Búsqueda dinámica de medicamentos
  - Edición de información
  - Eliminación de registros
- **Gestión de recetas médicas**:
  - Creación de recetas añadiendo medicamentos del inventario
  - Exportación de recetas en formato PDF
- **Interfaz responsiva** desarrollada con Bootstrap para una experiencia óptima en diferentes dispositivos

## 🖼️ Capturas de Pantalla

### Pantalla de Login
![Login Screen](https://github.com/Milton-Alas/medicamentosapp/blob/main/images_funcionalidad/login.png)


### Lista de Medicamentos
![Medicines Inventory](https://github.com/Milton-Alas/medicamentosapp/blob/main/images_funcionalidad/Inicio.png)
### Detalles de Medicamento
![Medicine Details](https://github.com/Milton-Alas/medicamentosapp/blob/main/images_funcionalidad/Detalle.png)

### Modal de Edición
![Edit Modal](https://github.com/Milton-Alas/medicamentosapp/blob/main/images_funcionalidad/editar-medicamento.png)

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - Bootstrap 5
  - jQuery
  - Font Awesome
  - jsPDF (generación de PDF)

- **Backend**:
  - Node.js
  - Express.js
  - EJS (para plantillas)

- **Base de Datos**:
  - PostgreSQL

## 📦 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Milton-Alas/medicamentosapp.git
   cd medicamentosapp
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar la base de datos**:
   - Crear una base de datos PostgreSQL
   - Configurar las credenciales de conexión en el archivo `.env`
   - Estructura recomendada para .env:
     ```
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=medigest_db
     ```

4. **Iniciar la aplicación**:
   ```bash
   npm start
   ```

5. **Acceder a la aplicación**:
   - Abrir el navegador en `http://localhost:3000`
   - Iniciar sesión con las credenciales predeterminadas:
     - Usuario: `admin`
     - Contraseña: `admin123`

## 📚 Estructura del Proyecto

```
medicamentosapp/
├── db_medicamentos/        # Scripts de la base de datos
├── imagenes_funcionalidad/ # imagenes de refencia de su funcionalidad
├── node_modules/           # Dependencias de Node.js
├── public/                 # Recursos estáticos
│   ├── scripts/            # Archivos JavaScript cliente
│   │   └── scriptMedicamentos.js
│   └── styles.css          # Estilos CSS
│   └── stylesMedicamentos.css
├── views/                  # Plantillas EJS
│   ├── index.ejs           # Página de inicio/login
│   └── medicamentos.ejs    # Página principal de medicamentos
├── .env                    # Variables de entorno y configuración
├── dbUser.js               # Configuración de conexión a base de datos
├── index.js                # Punto de entrada principal
├── package-lock.json       # Versiones específicas de dependencias
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

## 📊 Base de Datos

La base de datos PostgreSQL contiene las siguientes tablas principales:
- `medicamentos`: Almacena la información de los medicamentos
- `usuarios`: Información de usuarios y acceso

Si deseas contribuir al proyecto y necesitas la estructura completa de la base de datos, contacta al autor.

## 🚀 Uso

### Gestión de Medicamentos
1. Navegue a la sección "Medicamentos"
2. Para añadir un nuevo medicamento, haga clic en "Nuevo Medicamento"
3. Para ver detalles, editar o eliminar un medicamento, utilice los botones de acción en la tabla

### Creación de Recetas
1. En la lista de medicamentos, haga clic en el botón "+" para agregar medicamentos a la receta actual
2. Los medicamentos agregados aparecerán en el panel "Receta Actual"
3. Utilice el botón "Descargar Receta" para exportar la receta en formato PDF

### Cierre de Sesión
- Para salir de la aplicación, haga clic en el botón "Salir" en la barra de navegación superior

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haga fork del proyecto
2. Cree una rama para su funcionalidad (`git checkout -b feature/amazing-feature`)
3. Haga commit de sus cambios (`git commit -m 'Add some amazing feature'`)
4. Haga push a la rama (`git push origin feature/amazing-feature`)
5. Abra un Pull Request



## ✒️ Autor

- **Milton Alas** - [GitHub](https://github.com/Milton-Alas)

---

<p align="center">
  Desarrollado con ❤️ por Milton Alas - 2024
</p>