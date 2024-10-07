const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const usuarioRoute = require('./routes/usuarioRoutes')
const devRoute = require('./routes/devRoutes')
const proyectoRoute = require('./routes/proyectoRoutes')
const loginRoute = require('./routes/loginRoutes')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;  

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send("Server levantado correctamente");
})

app.use('/api/usuarios', usuarioRoute);
app.use('/api/desarrolladores', devRoute);
app.use('/api/proyectos', proyectoRoute);
app.use('/', loginRoute);

console.log(process.env.MONGO_URI)

app.listen(PORT, () => {
    connectDB();
    console.log("Servidor levantado en http://localhost:"+PORT);
})
