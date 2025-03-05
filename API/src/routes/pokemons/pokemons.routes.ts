import { Router } from 'express'
import { pokemonsControllers } from '../../controllers'
// import { validate } from '../../middlewares/validateSchemas.middleware'
// import { registerUserSchema } from '../../schemas/user.schema';

const router = Router()

const { 
    GetPokemonsFromAPI,
    createPokemon,
    getmyPokemons
} = pokemonsControllers

// router.post('/register', validate(registerUserSchema), register)
router.post('/getFromApi', GetPokemonsFromAPI)
router.post('/create', createPokemon)
router.post('/myPokemons',getmyPokemons)


export default router