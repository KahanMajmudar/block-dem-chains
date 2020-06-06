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
                data: {
                    loginStatus: true,
                    message: 'Login Successful'
                }
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
                data: {
                    loginStatus: false,
                    message: 'Token not provided'
                }
            })

            const user = Auth.verifyAuthToken(token)

            if(!user.isAdmin) Client.handleResponse({
                res: res,
                statusCode: 403,
                data: {
                    loginStatus: false,
                    message: 'Forbidden'
                }
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
                data: {
                    loginStatus: false,
                    message: 'Token not provided'
                }
            })
            const user = Auth.verifyAuthToken(token)

            if(!user.isVerified) Client.handleResponse({
                res: res,
                statusCode: 403,
                data: {
                    loginStatus: false,
                    message: 'User unverified'
                }
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