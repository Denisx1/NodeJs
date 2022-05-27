const Joi = require('joi')

const { userGlobalConstant } = require('../constants')

const newUserJoiSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).trim(),
    email: Joi.string().regex(userGlobalConstant.EMAIL_REGEXP).required().trim().lowercase(),
    age: Joi.number().integer().min(6),
    password: Joi.string().regex(userGlobalConstant.PASSWORD_REGEXP).required(),
    cars: Joi.array().items(userGlobalConstant, Joi.string()).when('girl', {is: true, then: Joi.required()}),
    girl: Joi.boolean()
})

module.exports = {
    newUserJoiSchema
}