import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api/heroes', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use( (req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});