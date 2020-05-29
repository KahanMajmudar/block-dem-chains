import { WalletController } from './wallet_controller'
import { Client } from '../../services'

export class Wallet {

    constructor() {
        this.walletcontroller = new WalletController()
    }

    init = async(req, res) => {

        try {
            const strength = req.body.strength
            const result = await this.walletcontroller.init(strength)
            Client.handleResponse({
                res: res,
                data: result
            })
        } catch (error) {
            Client.handleError({
                res: res,
                err: error
            })
        }
    }

    recover = async(req, res) => {

        try {
            const mnemonic = req.body.mnemonic
            const result = await this.walletcontroller.recover(mnemonic)
            Client.handleResponse({
                res: res,
                data: result
            })
        } catch (error) {
            Client.handleError({
                res: res,
                err: error
            })
        }
    }

    createETHAcc = async(req, res) => {

        try {
            const _mnemonic = req.body.mnemonic
            await this.walletcontroller.createETHAcc(_mnemonic)
            Client.handleResponse({
                res: res,
                data: 'Successfully created ETH Account'
            })
        } catch (error) {
            Client.handleError({
                res: res,
                err: error
            })
        }

    }

}


