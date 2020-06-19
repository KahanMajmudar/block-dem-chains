import { DecentralizedStorageController } from './contract_controller'
import { Client } from '../../services/index'

export class DecentralizedStorage {

    constructor() {
        this.controller = new DecentralizedStorageController()
    }

    getBalance = async(req, res) => {

        const result = await this.controller.getBalance()
        Client.handleResponse({
            res: res,
            data: result
        })
    }

    addUserInfo = async(req, res) => {

        try {
            const result = await this.controller.addUserInfo(req.body)
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

    viewUserInfo = async(req, res) => {

        try {
            const result = await this.controller.viewUserInfo(req.body.address)
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

    addPost = async(req, res) => {

        try {
            const result = await this.controller.addPost(req.body)
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

    getPostOfUser = async(req, res) => {

        try {
            const result = await this.controller.getPostsOfUser(req.body.address)
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

    getPostOwner = async(req, res) => {

        try {
            const result = await this.controller.getPostOwner(req.body.CID)
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
