import { Auth } from './auth'
import { Client } from '../services'

export class AuthController {

    login = async(req, res) => {

        try {
            const auth = new Auth()
            const result = await auth.login(req.body)
            Client.handleHeaderResponse({
                res: res,
                headerName: 'x-auth-token',
                headerData: result,
                data: 'Login Successfull!!'
            })
        } catch (error) {
            Client.handleError({
                res: res,
                err: error
            })
        }

    }

    admin = (req, res, next) => {

        try {
            const token = req.header('x-auth-token');
            if(!token) Client.handleResponse({
                res: res,
                statusCode: 401,
                data: 'Token not Provided!!'
            })

            const user = Auth.verifyAuthToken(token)

            if(!user.isAdmin) Client.handleResponse({
                res: res,
                statusCode: 403,
                data: 'Forbidden!!'
            })
            next()

        } catch (error) {
            Client.handleError({
                res: res,
                err: error
            })
        }

    }

    user = (req, res, next) => {

        try {
            const token = req.header('x-auth-token');
            if(!token) Client.handleResponse({
                res: res,
                statusCode: 401,
                data: 'Token not Provided!!'
            })
            const user = Auth.verifyAuthToken(token)

            if(!user.isVerified) Client.handleResponse({
                res: res,
                statusCode: 403,
                data: 'User not verified'
            })
            next()

        } catch (error) {
            Client.handleError({
                res: res,
                err: error
            })
        }

    }

}