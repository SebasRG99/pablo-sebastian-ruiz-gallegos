import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import {RequestHandler } from 'express';

export const verifyJWT: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            ok: false,
            message: 'Es necesario el token de autenticación.',
        });
        return; 
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        res.locals.jwt = decoded; // Aqui guardamos el JWT decodificado en res.locals
        next(); // Aqui continuamos con la siguiente función
    } catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Token no válido o expirado.',
        });
        return;
    }
};