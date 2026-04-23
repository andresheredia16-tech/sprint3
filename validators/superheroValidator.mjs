import { body } from 'express-validator';

export const validarSuperheroe = [
    body('nombreSuperHeroe')
        .trim() // Elimina espacios en blanco al inicio y final
        .notEmpty().withMessage('El nombre del superhéroe es requerido')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 60 }).withMessage('El nombre no puede exceder los 60 caracteres')
];