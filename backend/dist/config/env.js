"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Cargamos las variables del archivo .env
dotenv_1.default.config();
exports.env = {
    JWT_SECRET: process.env.JWT_SECRET || "default",
    DATABASE_URL: process.env.DATABASE_URL,
};
