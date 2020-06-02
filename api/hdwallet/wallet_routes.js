import { Router } from 'express'
import { Wallet } from './wallet'
const router = Router()

const wallet = new Wallet()

// console.log(wallet)

//CREATE Wallet
router.post('/create', wallet.init)
//RETRIEVE Wallet
router.post('/recover', wallet.recover)
//CREATE Account
router.post('/create/eth', wallet.createETHAcc)
//Addresses in the wallet
router.post('/eth/addresses', wallet.getETHAddresses)
//Wallet Info
router.post('/eth/info/:id', wallet.getETHAddressInfo)


module.exports = router
