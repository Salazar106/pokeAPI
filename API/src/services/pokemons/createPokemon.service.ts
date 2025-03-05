import { db } from "../../config";
import { IPokemon } from "../../interfaces/pokemon.types";


export const createPokemon = async ( data:IPokemon ) => {
    try {

        const verifyPokemon = await db.pokemons.findUnique({ where: { id: data.id } });
        if (verifyPokemon) throw new Error('El Pokémon ya existe');

        const newPokemon = await db.pokemons.create({
            data: { ...data },
        })
        
        return newPokemon
    } catch (error:any) {
        throw new Error(error.message || 'Internal server error');
    }
}