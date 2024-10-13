"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const router = (0, express_1.Router)();
//Usar esta ruta para registrar nuevo usuario
router.post("/signIn", Auth_1.signIn);
//Usar esta ruta para loggearse con usuario existente
router.post("/login", Auth_1.login);
exports.default = router;
