import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body); // Valida y transforma los datos
            next(); // Si no hay errores, pasa al siguiente middleware/controlador
        } catch (error: any) {
            res.status(400).json({
                message: 'Validation error',
                errors: error.errors, // Detalles de las validaciones fallidas
            });
            // No es necesario un return explícito aquí.
        }
    };
