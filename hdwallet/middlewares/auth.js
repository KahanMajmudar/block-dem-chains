import jwt from 'jsonwebtoken'
import { User, validate } from '../../users/user_model'
import bcrypt from 'bcryptjs'
import _ from 'lodash'

export class Auth {

    genAuthToken = (payload) => {

        const token = jwt.sign(payload, 'SecretKey');
        return token;

    }

    verifyAuthToken = (token) => {

        return jwt.verify(token, 'SecretKey')

    }

    login = async (userObject) => {

        const {error} = validate(userObject);
        if(error) throw new Error(error.details[0].message);

        const user = await User.findOne({email: userObject.email}).select('+password');
        if(!user) throw new Error('Email doesn\'t exist!!')

        const passValid = await bcrypt.compare(userObject.password, user.password);
        if(!passValid) throw new Error('Invalid Password, Try again!!');

        if(!user.isVerified) throw new Error('Please confirm your email!!')

        const payload = _.pick(user, ['id', 'isAdmin', 'isVerified'])
        const token = jwt.sign(payload, 'SecretKey');
        return token
    }

}