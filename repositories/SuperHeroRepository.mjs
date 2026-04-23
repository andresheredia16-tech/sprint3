import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        //RESOLVER
        const query = { [atributo]: valor };
        return await SuperHero.find(query);
    }

    async obtenerMayoresDe30() {
        //RESOLVER
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    // Implementación del método crear
    async crear(datos) {
        const nuevoHeroe = new SuperHero(datos);
        return await nuevoHeroe.save();
    }

    // Implementación del método actualizar
    async actualizar(id, datos) {
        return await SuperHero.findByIdAndUpdate(id, datos, { returnDocument: 'after' });
    }

    // Implementación del método borrarPorId
    async borrarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    // Implementación del método borrarPorNombre
    async borrarPorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }
}

export default new SuperHeroRepository();