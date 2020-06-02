import { UserController } from '../users/user_controller'
import { Client } from '../../services/index'

export class User {

    constructor() {
        this.controller = new UserController()
    }

    viewAll = async(req, res) => {

        try {
            const result = await this.controller.viewUser()
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

    viewUser = async(req, res) => {

        try {
            const result = await this.controller.viewUserid(req.params.id)
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

    createUser = async(req, res) => {

        try {
            const result = await this.controller.createUser(req.body)
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

    updateUser = async(req, res) => {

        try {
            const result = await this.controller.updateUser(req.params.id, req.body)
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

    deleteUser = async(req, res) => {

        try {
            const result = await this.controller.deleteUser(req.params.id)
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