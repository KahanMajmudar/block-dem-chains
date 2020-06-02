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
            const _network_type = req.body.network_type
            await this.walletcontroller.createETHAcc(_mnemonic, _network_type)
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

    getETHAddresses = (req, res) => {

        try {
            const account = req.body.account
            const from = req.body.from
            const to = req.body.to
            const result = this.walletcontroller.getETHAddresses(account, from, to)
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

    getETHAddressInfo = (req, res) => {

        try {
            // const account = req.body.account
            // const change = req.body.change
            const address_index = req.params.id
            const { address, privateKey } = this.walletcontroller.getETHAddressInfo(address_index)
            Client.handleResponse({
                res: res,
                data: {
                    address,
                    privateKey
                }
            })
        } catch (error) {
            Client.handleError({
                res: res,
                err: error
            })
        }
    }

}


