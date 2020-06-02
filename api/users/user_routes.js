import { Router } from 'express'
import { User } from '../users/user'
const router = Router()
const user = new User()

router.get('/all', user.viewAll)
router.post('/view/:id', user.viewUser)
router.post('/create', user.createUser)
router.post('/update/:id', user.updateUser)
router.post('/delete/:id', user.deleteUser)

module.exports = router
