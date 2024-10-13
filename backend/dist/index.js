"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para CORS y parseo de JSON
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // <--- Debe estar antes de las rutas
// Rutas
app.use('/auth', Auth_1.default);
// Middleware para manejar encabezados (puede ir después de las rutas)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor Express con TypeScript funcionando!');
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});
