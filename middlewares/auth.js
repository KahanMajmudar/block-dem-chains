import jwt from 'jsonwebtoken'
import { User, validate, validateLogin } from '../api/users/user_model'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import admin from 'firebase-admin'

export class Auth {

    static genAuthToken = (payload) => {

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;

    }

    static verifyAuthToken = (token) => {

        return jwt.verify(token, process.env.JWT_SECRET)

    }

    login = async (userObject) => {

        const db = admin.firestore()
        const { error } = validateLogin(userObject);
        if (error) throw new Error(error.details[0].message);

        const userQuerySnap = await db.collection('users').where('email', '==', userObject.email).get()
        let user = "";
        userQuerySnap.docs.forEach(doc => {
            if (!doc.exists) {
                throw new Error('Email doesn\'t exist!!')
            }
            else {
                user = doc.data()
            }
        })

        if (!user.isVerified) throw new Error('Please confirm your email!!')

        const passValid = await bcrypt.compare(userObject.password, user.password);
        if (!passValid) throw new Error('Invalid Password, Try again!!');


        const payload = _.pick(user, ['id', 'isAdmin', 'isVerified'])
        const token = Auth.genAuthToken(payload)
        return {
            token: token,
            name: user.name
        }
    }

}