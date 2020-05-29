import { Auth } from './auth'

export class AuthController {

    constructor() {
        this.Auth = new Auth()
    }

    login = async(req, res) => {

        try {
            const result = await this.Auth.login(req.body)
            res.header('x-auth-token', result).send("Login Successfull!!")
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }

    }

    admin = (req, res, next) => {

        const token = req.header('x-auth-token');
        if(!token) return res.status(401).send('Token not Provided!!')

        const user = this.Auth.verifyAuthToken()

        if(!user.isAdmin) return res.status(403).send('Forbidden!!');
        next();

    }

    user = (req, res, next) => {

        const token = req.header('x-auth-token');
        if(!token) return res.status(401).send('Token not Provided!!')

        const user = this.Auth.verifyAuthToken(token)

        if(!user.isVerified) return res.status(403).send('Verify!!');
        next();

    }

}