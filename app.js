const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');

app.use(bodyParser.json());
app.set('view engine', 'ejs');

// URL de conexión externa proporcionada por Render.com
const connectionString = 'postgres://centro_de_estudiantes_cornelio_saavedra_user:OkpEHMevgSy3AMut4EhvTJIGmySff5pp@dpg-cjpad78jbais73838qm0-a.oregon-postgres.render.com/centro_de_estudiantes_cornelio_saavedra';

const db = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, // Opcional, para evitar errores de certificado no confiable
    },
  });
  db.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos PostgreSQL:', error);
  });


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    try {
      const { user, password } = req.body;
  
      // Realiza una consulta a la base de datos para validar las credenciales
      const result = await db.oneOrNone('SELECT * FROM "user_Admin" WHERE "user" = $1 AND "password" = $2', [user, password]);
  
      if (result) {
        // Las credenciales son válidas
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Las credenciales son inválidas
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

app.listen(10000, ()=> {
    console.log('Server run')
})