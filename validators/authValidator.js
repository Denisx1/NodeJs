const Joi = require('joi')
const constants = require('../constants')

const { userGlobalConstant } = require('../constants')

const loginSchema = Joi.object({
    email: Joi.string().regex(userGlobalConstant.EMAIL_REGEXP).required().trim().lowercase(),
    password: Joi.string().regex(userGlobalConstant.PASSWORD_REGEXP).required()
})

const emailJoiSchema = Joi.object({
    email: Joi.string().regex(userGlobalConstant.EMAIL_REGEXP).trim().lowercase().required()
})

const forgotPasswordJoiSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().regex(userGlobalConstant.PASSWORD_REGEXP).required()
})

const changePasswordJoiSchema = Joi.object({
    password: Joi.string().regex(userGlobalConstant.PASSWORD_REGEXP).required(),
    newPassword: Joi.string().regex(userGlobalConstant.PASSWORD_REGEXP).required()
})



module.exports = {
    loginSchema,
    emailJoiSchema,
    forgotPasswordJoiSchema,
    changePasswordJoiSchema
}