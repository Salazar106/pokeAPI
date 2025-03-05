import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import pokemonRoutes from './pokemons/pokemons.routes'

import { validateJWT } from '../middlewares/validateJWT.middleware'

const router = Router()

router.use('/auth', authRoutes)
router.use('/poke/',validateJWT, pokemonRoutes)


export default router 