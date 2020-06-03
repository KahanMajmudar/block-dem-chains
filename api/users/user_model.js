import mongoose from 'mongoose'
import Joi from '@hapi/joi'

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    },

    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },

    password: {
        type: String,
        select: false,
        trim: true,
        minlength: 5,
        maxlength: 1024
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    }

})

const User = mongoose.model('User', userSchema)


function validateUser(user) {

    const schema = Joi.object({

        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(1024).required()

    });
    return schema.validate(user);
}

function validateLogin(user) {

    const schema = Joi.object({

        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(1024).required()

    })
    return schema.validate(user)
}

module.exports.User = User
module.exports.validate = validateUser
module.exports.validateLogin = validateLogin






