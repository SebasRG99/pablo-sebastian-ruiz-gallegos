"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signIn = void 0;
const Users_1 = require("../db/Users");
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password } = req.body;
        console.log("mybody:", req.body);
        const existUser = yield (0, Users_1.searchUserByEmail)(correo);
        if (existUser) {
            res.status(401).json({
                ok: false,
                message: 'Ya existe un usuario con este correo.',
            });
            return;
        }
        // Cifrar la contraseña antes de guardarla
        const hashedPassword = yield (0, hash_1.hashPassword)(password);
        const newUser = { correo, password: hashedPassword };
        yield (0, Users_1.createNewUser)(newUser);
        res.status(201).json({
            ok: true,
            message: 'Usuario creado exitosamente.',
        });
    }
    catch (error) {
        console.error('Error en la creación del usuario:', error);
        next(error);
    }
});
exports.signIn = signIn;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password } = req.body;
        const user = yield (0, Users_1.searchUserByEmail)(correo);
        if (!user) {
            res.status(401).json({
                ok: false,
                message: 'Correo o contraseña incorrectos.',
            });
            return;
        }
        const isValidPassword = yield (0, hash_1.verifyPassword)(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({
                ok: false,
                message: 'Correo o contraseña incorrectos.',
            });
            return;
        }
        // Generamos el token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, correo: user.correo }, env_1.env.JWT_SECRET, {
            expiresIn: '1h', // El token será válido solamente por 1 hora
        });
        // Enviaremos el token como parte de la respuesta
        res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso.',
            token,
        });
    }
    catch (error) {
        console.error('Error en el inicio de sesión:', error);
        next(error);
    }
});
exports.login = login;
