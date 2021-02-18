import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import { validate } from './user_model'
import { MailController } from '../mail/mail_controller'
import { Auth } from '../../middlewares/auth'
import admin from 'firebase-admin'


export class UserController {

    constructor() {

        this.user
    }

    viewUserid = async (userId) => {

        const db = admin.firestore()

        const result = await db.collection('users').doc(userId).get();

        if (!result.exists) return ({ "msg": 'No User found!!' })

        return result.data()

    }

    createUser = async (userObject) => {

        const db = admin.firestore()
        const { error } = validate(userObject);
        if (error) return (error.details[0].message);

        const querySnap = await db.collection('users').where('email', '==', userObject.email).get()
        querySnap.docs.forEach(doc => {
            if (doc.data()) throw new Error('User exists!!')
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

        const db = admin.firestore()

        const result = await db.collection('users').doc(userId).get();

        if (!result.exists) return ({ "msg": 'No User found!!' })

        const salt = await bcrypt.genSalt(10);
        userObject.password = await bcrypt.hash(userObject.password, salt);

        const updatedResult = await db.collection('users').doc(userId).update({
            ...userObject
        })

        if (!updatedResult) return ({ "msg": 'No User found!!' })

        return { "msg": "Updated Successfully!" }
    }

    deleteUser = async (userId) => {

        const db = admin.firestore()

        const result = await db.collection('users').doc(userId).get();

        if (!result.exists) return ({ "msg": 'No User found!!' })

        const deletedResult = await db.collection('users').doc(userId).delete()

        if (!deletedResult) return ('ID doesn\'t exist!!');

        return { "msg": 'Deleted Successfully' }

    }

}