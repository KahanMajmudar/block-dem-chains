import { TransactionController } from './transaction_controller'
import { Client } from '../../services'


export class Transaction {

    constructor() {
        this.controller = new TransactionController()
    }

    // addTransaction = async(req, res) => {

    //     try {
    //         const result = await this.controller.addTransaction(req.body)
    //         console.log(result)
    //         Client.handleResponse({
    //             res: res,
    //             data: result
    //         })
    //     } catch (error) {
    //         Client.handleError({
    //             res: res,
    //             err: error
    //         })
    //     }
    // }

    viewTransaction = async(req, res) => {

        try {
            const result = await this.controller.viewTransactions(req.body.address)
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

}