import { body } from 'express-validator';

export const validarSuperheroe = [
    // Reglas para nombreSuperHeroe
    body('nombreSuperHeroe')
        .trim() // Elimina espacios en blanco al inicio y final
        .notEmpty().withMessage('El nombre del superhéroe es requerido').bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres').bail()
        .isLength({ max: 60 }).withMessage('El nombre no puede exceder los 60 caracteres'),

    // Reglas para nombreReal
    body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es requerido').bail()
        .isLength({ min: 3 }).withMessage('El nombre real debe tener al menos 3 caracteres').bail()
        .isLength({ max: 60 }).withMessage('El nombre real no puede exceder los 60 caracteres'),
    
    // Reglas para edad
    body('edad')
        .trim()
        .notEmpty().withMessage('La edad es requerida').bail()
        .isNumeric().withMessage('La edad debe ser un número').bail()
        .custom(value => value >= 0).withMessage('La edad no puede ser un número negativo'),
    
    // Reglas para poderes
    // 1. Validar el arreglo
    body('poderes')
        .isArray({ min: 1 }).withMessage('Los poderes deben ser un arreglo y contener al menos un elemento').bail(),

    // 2. Validar el contenido del arreglo
    body('poderes.*')
        .trim()
        .isString().withMessage('Cada poder debe ser texto').bail()
        .isLength({ min: 3 }).withMessage('Cada poder debe tener al menos 3 caracteres')
        .isLength({ max: 60 }).withMessage('Ningún poder puede exceder los 60 caracteres')

];