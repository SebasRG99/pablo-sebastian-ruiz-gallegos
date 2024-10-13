import dotenv from 'dotenv';

// Cargamos las variables del archivo .env
dotenv.config();

export const env = {
    JWT_SECRET: process.env.JWT_SECRET || "default",
    DATABASE_URL: process.env.DATABASE_URL,
};