import { Request, Response } from 'express';
import { IUser } from '../interfaces/User';
import { searchUserByPhone, createNewUser } from '../db/Users';
import { createAccessToken } from '../db/AccessTokens';
import { hashPassword, verifyPassword } from '../utils/hash';
import { createJWT } from '../utils/jwt';
import { env } from '../config/env';

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, password, img_profile } = req.body;
        const existUser = await searchUserByPhone(phone);
        if (existUser) {
            res.status(409).json({
                ok: false,
                message: 'Ya existe un usuario con este teléfono.',
            });
            return
        }
        const hashedPassword = await hashPassword(password);
        const newUser: IUser = {
            id: '',
            name,
            phone,
            password: hashedPassword,
            img_profile,
        };
        await createNewUser(newUser);
        res.status(201).json({
            ok: true,
            message: 'Usuario creado exitosamente.',
        });
        return
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error Al Crear El Usuario',
            error,
        });
        return
    }
};

export const login = async (req: Request, res: Response):Promise<void> => {
    try {
        const { phone, password } = req.body;
        const user = await searchUserByPhone(phone);
        if (!user) {
            res.status(401).json({
                ok: false,
                message: 'Teléfono No Registrado.',
            });
            return
        }
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({
                ok: false,
                message: 'Teléfono o contraseña incorrectos.',
            });
            return
        }
        //Creamos el Token
        const token = await createJWT(user.id, env.JWT_SECRET, "1h")
        //Lo registramos en la db
        await createAccessToken(token, user.id);
        res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso.',
            token,
        });
        return
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Iniciar Sesion',
            error,
        });
        return
    }
};