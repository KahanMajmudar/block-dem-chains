import jwt from 'jsonwebtoken'
import { User, validate, validateLogin } from '../api/users/user_model'
import bcrypt from 'bcryptjs'
import _ from 'lodash'

export class Auth {

    static genAuthToken = (payload) => {

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;

    }

    static verifyAuthToken = (token) => {

        return jwt.verify(token, process.env.JWT_SECRET)

    }

    login = async (userObject) => {

        const {error} = validateLogin(userObject);
        if(error) throw new Error(error.details[0].message);

        const user = await User.findOne({email: userObject.email}).select('+password');
        if(!user) throw new Error('Email doesn\'t exist!!')

        const passValid = await bcrypt.compare(userObject.password, user.password);
        if(!passValid) throw new Error('Invalid Password, Try again!!');

        if(!user.isVerified) throw new Error('Please confirm your email!!')

        const payload = _.pick(user, ['id', 'isAdmin', 'isVerified'])
        const token = Auth.genAuthToken(payload)
        return {
            token: token,
            name: user.name
        }
    }

}