const express = require('express');
const path = require('path');
const db = require('./dbUser');
require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

const session = require('express-session');

// Middleware para parsear application/json
//app.use(bodyParser.json());
//app.use(express.json());
app.use(express.json()); //se elimino para poder usar el bodyparser
app.use(express.urlencoded({ extended: true })); 


app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/usuarios', async (req, res) => {
  try {
    const users = await db.getUsers(); // Usar db.getUsers() en lugar de getUsers()
    res.json(users);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).send('Error interno del servidor');
  }
});

// Middleware de manejo de errores debe ir al final
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

const { verifyUser } = require('./dbUser');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const isAuthenticated = await verifyUser(username, password);

    if (isAuthenticated) {
      res.json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

//llamar o importar pagina de medicamentos.ejs

app.get('/medicamentos.ejs', (req, res) => {
  // Usa path.join para construir la ruta completa al archivo
  const filePath = path.join(__dirname, '/medicamentos.ejs');
  // Usa res.sendFile para enviar el archivo al cliente
  res.render('medicamentos.ejs');
});

//para traer todos los medicamentos

app.get('/medicamentos', async (req, res) => {
  try {
    const medicamentos = await db.getMedicamentos();
    res.json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    res.status(500).json({ error: 'Error al obtener medicamentos' });
  }
});

//para el detalle de los medicamentos

const { getDetMedicamento } = require('./dbUser');

app.get('/medicamentos/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Solicitando medicamento con ID: ${id}`);

  try {
    const detMedicamento = await getDetMedicamento(id);
    console.log('Detalle del medicamento obtenido:', detMedicamento);
    if (detMedicamento) {
      res.status(200).json(detMedicamento);
    } else {
      console.log(`Medicamento con ID ${id} no encontrado`);
      res.status(404).json({ message: 'Medicamento no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener detalles del medicamento', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//para cargar el formularo addmedicamento

app.get('/addmedicamento.ejs', (req, res) => {
  // Usa path.join para construir la ruta completa al archivo
  const filePath = path.join(__dirname, '/addmedicamento.ejs');
  // Usa res.sendFile para enviar el archivo al cliente
  res.render('addmedicamento.ejs');
});

//para cargar la lista de tipos de medicamentos
app.get('/tipo', async (req, res) => {
  try {
    const tipo = await db.getTipo();
    res.json(tipo);
} catch (error) {
  console.error('Error al obtener medicamentos:', error);
  res.status(500).json({ error: 'Error al obtener medicamentos' });
}
});

//para agregar medicamentos
const { addMedicamento } = require('./dbUser');

app.post('/medicamentos', async (req, res) => {
  const { nombre, categoria, tipo, componente, uso } = req.body;

  console.log('Datos recibidos en el servidor:', req.body);
  
  try {
    const result = await db.addMedicamento(nombre, categoria, tipo, componente, uso);
    if (result) {
      console.log('Medicamento agregado:', result);
      res.status(201).json({ message: 'Medicamento agregado exitosamente', medicamento: result });
    } else {
      res.status(500).json({ message: 'Error al agregar el medicamento' });
    }
  } catch (error) {
    console.error('Error detallado al agregar el medicamento:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

//para eliminar medicamento
const { deleteMedicamento } = require('./dbUser');

app.delete('/medicamentos/:id', async (req, res)=>{
  const { id } = req.params;
  try {
    const success = await deleteMedicamento(id);
    if (success){
      res.status(200).json({message: 'Medicamento eliminado exitosamente'});
    } else {
      res.status(500).json({ message: 'Error al eliminar el medicamento'});
    }
  } catch (error) {
    console.error('Error al eliminar el medicamento:', error);
    res.status(500).json({ message: 'Error interno del servidor' })
    }
});

//actualizar medicamento
const { updateMedicamento } = require('./dbUser');

app.put('/medicamentos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, tipo, componente, uso } = req.body;
  try {
    const success = await updateMedicamento(id, nombre, categoria, tipo, componente, uso);
    if (success) {
      res.status(200).json({ message: 'Medicamento actualizado exitosamente' });
    } else {
      res.status(500).json({ message: 'Error al actualizar el medicamento' });
    }
  } catch (error) {
    console.error('Error al actualizar el medicamento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
  // Si estás usando sessions
  if (req.session) {
      req.session.destroy(err => {
          if (err) {
              return res.status(500).json({ message: 'Error al cerrar sesión' });
          }
          res.clearCookie('connect.sid'); // Elimina la cookie de sesión (ajusta el nombre según tu configuración)
          return res.status(200).json({ message: 'Sesión cerrada correctamente' });
      });
  } else {
      // Si no estás usando sessions o ya no hay sesión
      res.status(200).json({ message: 'Sesión cerrada correctamente' });
  }
});