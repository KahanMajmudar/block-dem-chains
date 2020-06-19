import Joi, { func } from '@hapi/joi'

function validateAddUserInfo(user) {

    const schema = Joi.object({
        address: Joi.string().required().trim(),
        name: Joi.string().min(5).max(20).required(),
        bio: Joi.string().min(5).max(30).required()
    });
    return schema.validate(user, {abortEarly: false})
}


function validateAddPost(data) {

    const schema = Joi.object({
        address: Joi.string().required().trim(),
        CID: Joi.string().required().trim(),
        title: Joi.string().min(5).max(20).required().trim(),
        tag: Joi.string().required().trim(),
        type: Joi.string().min(3).max(10).required().trim()
    })
    return schema.validate(data, {abortEarly: false})
}


module.exports.validateAddUserInfo = validateAddUserInfo
module.exports.validateAddPost = validateAddPost
