import express from 'express'
import cors from 'cors'
import authRoutes from './routes/Auth'
import productRoutes from './routes/Products'
import './tasks/cron'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de CORS y parseo de JSON
app.use(cors())
app.use(express.json())// Middleware para parsear JSON

// Rutas
app.use('/auth', authRoutes)
app.use('/products', productRoutes)

// Ruta Inicial
app.get('/', (_, res) => {
    res.send('¡Servidor Express con TypeScript funcionando!')
})

// Inicio de Server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`)
})
