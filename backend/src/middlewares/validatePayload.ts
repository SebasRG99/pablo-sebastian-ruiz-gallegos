import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validatePayload = (schema: Schema) => 
    (req: Request, res: Response, next: NextFunction): void => {
        
    const { body } = req;
    const { error } = schema.validate(body, { abortEarly: false });

    if (error) {
        res.status(400).json({
            ok: false,
            message: 'Error en la validación de los datos.',
            errors: error.details.map((err) => err.message)
        });
        return; // Aseguramos que no continúe si hay error
    }

    next(); // Continuamos a la siguiente funcion si no hay errores
};