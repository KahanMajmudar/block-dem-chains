import { Router } from 'express';
import { IpfsController } from './ipfs_controller';
const router = Router()
const ipfs_controller = new IpfsController()

router.post('/create', ipfs_controller.getDb)
// router.post('/addPost', ipfs_controller.addToDb)

module.exports = router
