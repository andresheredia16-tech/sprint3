import express from 'express';
import { validarSuperheroe } from '../validators/superheroValidator.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';

import {
obtenerSuperheroePorIdController,
obtenerTodosLosSuperheroesController,
buscarSuperheroesPorAtributoController,
obtenerSuperheroesMayoresDe30Controller, crearSuperheroeController, actualizarSuperheroeController, borrarSuperheroePorIdController, borrarSuperheroePorNombreController, agregarSuperheroeController, mostrarFormularioEdicionController, editarSuperheroeController, eliminarSuperheroeController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

// 1. Ruta para MOSTRAR el formulario
router.get('/nuevo', (req, res) => {
    res.render('addSuperhero');
});
// 2. Ruta para PROCESAR el formulario
router.post('/agregar', validarSuperheroe, handleValidationErrors, agregarSuperheroeController);

router.get('/', obtenerTodosLosSuperheroesController);
router.get('/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/:id/editar', mostrarFormularioEdicionController);
router.get('/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/:id', obtenerSuperheroePorIdController);

router.post('/', validarSuperheroe, handleValidationErrors, crearSuperheroeController);
router.put('/:id/editar', validarSuperheroe, handleValidationErrors, editarSuperheroeController);
router.put('/:id', actualizarSuperheroeController);
router.delete('/nombre/:nombre', borrarSuperheroePorNombreController);
router.delete('/:id', eliminarSuperheroeController);

export default router;