import Joi from 'joi';

// Esquema de validación para creacion de múltiples productos (Batch POST)
export const createProductSchema = Joi.array().items(
    Joi.object({
        name: Joi.string().required().min(3).max(100),
        description: Joi.string().optional().max(500),
        height: Joi.number().positive().required(),
        length: Joi.number().positive().required(),
        width: Joi.number().positive().required(),
    })
);

// Esquema de validación para edicion de múltiples productos (Batch PUT)
export const putProductSchema = Joi.array().items(
    Joi.object({
        id: Joi.string().required().min(1).max(25),
        name: Joi.string().required().min(3).max(100),
        description: Joi.string().optional().max(500),
        height: Joi.number().positive().required(),
        length: Joi.number().positive().required(),
        width: Joi.number().positive().required(),
    })
);