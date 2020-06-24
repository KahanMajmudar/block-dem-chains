import { Transaction } from './transaction_model'
import Web3 from 'web3'


export class TransactionController {

    constructor() {
        this.Tx = Transaction
    }

    addTransaction = async(txObject) => {

        try {
            const tx = new this.Tx(txObject)
            await tx.save()
        } catch (error) {
            throw error
        }

    }

    viewTransactions = async(address) => {

        const isValid = Web3.utils.isAddress(address)
        if(!isValid) throw new Error('Invalid Address')

        const result = await this.Tx.find({
            from: address
        }, { __v: 0, _id: 0 })

        if(result.length == 0) throw new Error('Address doesn\'t exist')
        return result

    }

}