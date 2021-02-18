import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import { validate } from './user_model'
import { MailController } from '../mail/mail_controller'
import { Auth } from '../../middlewares/auth'
import admin from 'firebase-admin'
import { doc } from 'prettier'


export class UserController {

    constructor() {

        this.user
        // this.User = User
    }

    viewUser = async () => {

        const result = await this.User.find({}).select('+name')

        if (!result) return ('No documents found!!')

        return result

    }

    viewUserid = async (userId) => {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return ('ID Not valid!!')
        }

        const result = await this.User.findById(userId);
        if (!result) return ('User not found!!');

        return result
    }

    createUser = async (userObject) => {

        const db = admin.firestore()
        const { error } = validate(userObject);
        if (error) return (error.details[0].message);


        // db.collection('users').where('email', '==', userObject.email)
        //     .get()
        //     .then((result) => {
        //         result.docs.forEach((doc) => {
        //             if (doc.exists) {
        //                 throw new Error('User already exist!!')
        //             }
        //         })
        //     })
        const querySnap = await db.collection('users').where('email', '==', userObject.email).get()
        querySnap.docs.forEach(doc => {
            if (doc.exists) throw new Error('USer exists!!')
        })

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(userObject.password, salt);

        const userFirebase = {
            name: userObject.name,
            email: userObject.email,
            password: encryptedPassword,
            isAdmin: false,
            isVerified: false
        }

        const docRef = await db.collection('users').add(userFirebase)
        const result = {
            id: docRef.id,
            name: userFirebase.name,
            email: userFirebase.email
        }

        const payload = {
            id: docRef.id
        }


        const token = Auth.genAuthToken(payload);
        const data = {
            name: userFirebase.name,
            email: userFirebase.email,
            token: token
        }

        const mailer = new MailController()
        await mailer.verificationMailSender(data)

        return result

    }

    updateUser = async (userId, userObject) => {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return ('ID Not valid!!')
        }

        const salt = await bcrypt.genSalt(10);
        userObject.password = await bcrypt.hash(userObject.password, salt);

        const result = await this.User.findByIdAndUpdate(userId, {
            $set: _.pick(userObject, ['name', 'email', 'password'])
        }, { new: true })

        if (!result) return ('ID doesn\'t exist!!')

        return result

    }

    deleteUser = async (userId) => {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return ('ID Not valid!!')
        }

        const result = await this.User.findByIdAndDelete(userId);

        if (!result) return ('ID doesn\'t exist!!');

        return result

    }

}