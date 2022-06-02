const Joi = require('joi')

const { userGlobalConstant } = require('../constants')

const loginSchema = Joi.object({
    email: Joi.string().regex(userGlobalConstant.EMAIL_REGEXP).required().trim().lowercase(),
    password: Joi.string().regex(userGlobalConstant.PASSWORD_REGEXP).required()
})

module.exports = {
    loginSchema
}