import {
    obtenerSuperheroePorId, obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearSuperheroe, actualizarSuperheroe, borrarSuperheroePorId, borrarSuperheroePorNombre
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }

}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        /*
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);*/
        res.render('dashboard', { superheroes });

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los superhéroes',
            error: error.message
        });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: 'No se encontraron superhéroes con ese atributo'
            });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al buscar los superhéroes',
            error: error.message
        });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: 'No se encontraron superhéroes mayores de 30 años'
            });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

export async function crearSuperheroeController(req, res) {
    try {
        const nuevoHeroe = await crearSuperheroe(req.body);
        const heroeFormateado = renderizarSuperheroe(nuevoHeroe);
        // Responde con JSON
        res.status(201).json(heroeFormateado);
    } catch (error) {
        res.status(500).send({ 
            mensaje: 'Error al crear el superhéroe en la API', 
            error: error.message 
        });
    }
}

export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const superheroe = await actualizarSuperheroe(id, datosActualizados);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ 
            mensaje: 'Error al actualizar el superhéroe', 
            error: error.message 
        });
    }
}

export async function borrarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await borrarSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar el superhéroe', error: error.message });
    }
}

export async function borrarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const superheroe = await borrarSuperheroePorNombre(nombre);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar el superhéroe', error: error.message });
    }
}

export async function agregarSuperheroeController(req, res) {
    try {
        const datos = req.body;
        await crearSuperheroe(datos);
        // Responde redirigiendo la página al dashboard
        return res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send({ 
            mensaje: 'Error al agregar el superhéroe desde la web', 
            error: error.message 
        });
    }
}

// 1. Mostrar el formulario con los datos precargados
export async function mostrarFormularioEdicionController(req, res) {
    try {
        const { id } = req.params;
        const heroe = await obtenerSuperheroePorId(id);
        
        if (!heroe) {
            return res.status(404).send('Superhéroe no encontrado');
        }
        
        res.render('editSuperhero', { heroe });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe para editar', error: error.message });
    }
}

// 2. Procesar la edición y redirigir
export async function editarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        
        await actualizarSuperheroe(id, datosActualizados);
        
        // Volvemos al dashboard tras actualizar
        return res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al editar el superhéroe', error: error.message });
    }
}

// Controlador para ELIMINAR desde la Web
export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        
        // Llamamos al servicio para que borre el documento en MongoDB
        await borrarSuperheroePorId(id);
        
        // Redirigimos al dashboard para ver la lista actualizada
        return res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send({ 
            mensaje: 'Error al eliminar el superhéroe desde la web', 
            error: error.message 
        });
    }
}