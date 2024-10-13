"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            ok: false,
            message: 'Es necesario el token de autenticación.',
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET); // Usamos la clave JWT_SECRET del .env
        res.locals.jwt = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no válido o expirado.',
        });
    }
}
