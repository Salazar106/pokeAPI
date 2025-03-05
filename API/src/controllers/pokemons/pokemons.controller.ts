import { Request, Response } from 'express';
import { pokemonServices } from '../../services'

export const GetPokemonsFromAPI = async (req: Request, res: Response): Promise<any> => {
    try{
        const identifier = req.body.identifier 
        const pokemons = await pokemonServices.getPokemonFromAPI(identifier)

        return res.status(200).json({message: 'fetching pokemons', pokemons});
    }catch(error:any){
        console.error('Error creating user:', error)
        const errorMessage = error.message || 'Internal server error'
        return res.status(500).json({ message: errorMessage })
    }
}


export const createPokemon = async (req: Request, res: Response): Promise<any> => {
    try{

        const newPokemon = await pokemonServices.createPokemon(req.body)
        return res.status(200).json({message: 'New pokemon in our pokedex', newPokemon});

    }catch(error:any){
        console.error('Error creating user:', error)
        const errorMessage = error.message || 'Internal server error'
        return res.status(500).json({ message: errorMessage })
    }
}


export const getmyPokemons = async (req: Request, res: Response): Promise<any> => {
    try {
        // Obtener los parámetros de la consulta
        const { page, pageSize } = req.query;

        // Convertir los parámetros a números (o usar valores por defecto)
        const pageNumber = page ? parseInt(page as string, 10) : 0;
        const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 10;

        // Llamar al servicio con los parámetros correctos
        const pokemons = await pokemonServices.getMyPokemonsService(pageNumber, pageSizeNumber);

        // Devolver la respuesta
        return res.status(200).json({ message: "success fetching pokemons", pokemons });
    } catch (error: any) {
        console.error('Error fetching my pokemons:', error);
        const errorMessage = error.message || 'Internal server error';
        return res.status(500).json({ message: errorMessage });
    }
};