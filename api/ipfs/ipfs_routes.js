import { Router } from 'express';
import { IpfsController } from './ipfs_controller';
const router = Router()
const ipfs_controller = new IpfsController()

router.post('/addPost', ipfs_controller.postResource)

module.exports = router
