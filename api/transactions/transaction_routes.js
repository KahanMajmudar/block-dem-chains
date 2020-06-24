import { Router } from 'express'
import { Transaction } from './transaction'
const router = Router()
const tx = new Transaction()


// router.post('/addTx', tx.addTransaction)
router.post('/viewTx', tx.viewTransaction)


module.exports = router