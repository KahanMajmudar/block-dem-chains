import { Router } from 'express'
// import { WalletController } from '../controllers/wallet_controller'
import { Wallet } from './wallet'
const router = Router()

const wallet = new Wallet()

// console.log(wallet)

//CREATE Wallet
router.post('/create', wallet.init)
// router.post('/create/:currency/account', wallet.createAccount)
//RETRIEVE Wallet
router.post('/recover', wallet.recover)
// //CREATE Account (bch, btc, eth)
router.post('/create/bch', wallet.createBCHAcc)
router.post('/bch/addresses', wallet.getBCHAddresses)
router.post('/bch/info/:id', wallet.getBCHAddressInfo)
// router.post('/:currency/addresses', wallet.getAddresses)
// router.post('/create/btc', )
// router.post('/create/eth', )

module.exports = router
