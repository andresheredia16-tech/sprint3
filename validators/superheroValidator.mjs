import { body } from 'express-validator';

export const validarSuperheroe = [
    // Reglas para nombreSuperHeroe
    body('nombreSuperHeroe')
        .trim() // Elimina espacios en blanco al inicio y final
        .notEmpty().withMessage('El nombre del superhéroe es requerido')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 60 }).withMessage('El nombre no puede exceder los 60 caracteres'),

    // Reglas para nombreReal
    body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es requerido')
        .isLength({ min: 3 }).withMessage('El nombre real debe tener al menos 3 caracteres')
        .isLength({ max: 60 }).withMessage('El nombre real no puede exceder los 60 caracteres')

];