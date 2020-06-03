import { Router } from 'express'
import { AuthController } from './middleware'
const router = Router()
const auth = new AuthController()

router.post('/login', auth.login)

module.exports = router