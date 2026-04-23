import express from 'express';
import { validarSuperheroe } from '../validators/superheroValidator.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';

import {
obtenerSuperheroePorIdController,
obtenerTodosLosSuperheroesController,
buscarSuperheroesPorAtributoController,
obtenerSuperheroesMayoresDe30Controller, crearSuperheroeController, actualizarSuperheroeController, borrarSuperheroePorIdController, borrarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/', obtenerTodosLosSuperheroesController);
router.get('/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/:id', obtenerSuperheroePorIdController);

router.post('/', validarSuperheroe, handleValidationErrors, crearSuperheroeController);
router.put('/:id', actualizarSuperheroeController);
router.delete('/nombre/:nombre', borrarSuperheroePorNombreController);
router.delete('/:id', borrarSuperheroePorIdController);

export default router;