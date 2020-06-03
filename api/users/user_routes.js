import { Router } from 'express'
import { User } from '../users/user'
import { AuthController } from '../../middlewares/middleware'
const router = Router()
const user = new User()
const authcontroller = new AuthController()

router.get('/all', authcontroller.admin, user.viewAll)
router.post('/view/:id', authcontroller.user, user.viewUser)
router.post('/create', user.createUser)
router.post('/update/:id', authcontroller.user, user.updateUser)
router.post('/delete/:id', authcontroller.admin, user.deleteUser)

module.exports = router
