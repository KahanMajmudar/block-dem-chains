import { Router } from 'express'
import { DecentralizedStorage } from './contract'
import { string } from '@hapi/joi'
const router = Router()
const storage = new DecentralizedStorage()

router.get('/getBalance', storage.getBalance)
router.post('/addUserInfo', storage.addUserInfo)
router.post('/viewUserInfo', storage.viewUserInfo)
router.post('/addPost', storage.addPost)
router.post('/userPosts', storage.getPostOfUser)
router.post('/postOwner', storage.getPostOwner)


module.exports = router
