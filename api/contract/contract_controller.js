import Web3 from "web3"
import json from '../../build/contracts/DecentralizedStorage.json'
import { validateAddUserInfo, validateAddPost } from "./contract_model"
import { TransactionController } from "../transactions/transaction_controller"

const web3 = new Web3(
    new Web3.providers.WebsocketProvider('ws://127.0.0.1:9545')
)


export class DecentralizedStorageController {

    constructor() {
        this.tokenContract  = new web3.eth.Contract(json['abi'], '0xa254d62856EdCe805cd8D6D2d660107A283Fe844')
        this.events = this.tokenContract.events
        this.TxController = new TransactionController()
    }

    getBalance = async() => {

        try {
            const value = await web3.eth.getBalance(this.tokenContract._address)
            return web3.utils.fromWei(value, 'ether')
        } catch (error) {
            throw error
        }

    }

    addUserInfo = async(userInfo) => {

        try {
            const { error } = validateAddUserInfo(userInfo)
            if (error) throw error

            const details = await this.tokenContract.methods.setProfile(userInfo.name, userInfo.bio).send({
                from: userInfo.address
            })

            details.description = "User Added"
            await this.TxController.addTransaction(details)
            return details
        } catch (error) {
            throw error
        }

    }

    viewUserInfo = async(address) => {

        try {
            const details = await this.tokenContract.methods.userInfo(address).call()
            return details
        } catch (error) {
            throw error
        }

    }

    addPost = async(dataObject) => {

        try {
            const { error } = validateAddPost(dataObject)
            if (error) throw error

            const result = await this.tokenContract.methods.addPost(dataObject.CID, dataObject.title, dataObject.tag, dataObject.type).send({
                from: dataObject.address,
                gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
                gasLimit: web3.utils.toHex('3000000')
            })

            result.description = "Post Added"
            await this.TxController.addTransaction(result)
            return result

        } catch (error) {
            throw error
        }

    }

    getPostsOfUser = async(address) => {

        try {
            const len = await this.tokenContract.methods.totalPosts(address).call()
            let CID = []
            for (let index = 0; index < len; index++) {
                CID[index] = await this.tokenContract.methods.postPerUser(address, index).call()
            }
            return CID
        } catch (error) {
            throw error
        }

    }

    getPostOwner = async(CID) => {

        try {
            const postOwner = await this.tokenContract.methods.postOwner(CID).call()
            return { postOwner }
        } catch (error) {
            throw error
        }
    }

}