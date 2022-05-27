const Joi = require("joi");

const { userGlobalConstant } = require("../constants");

const userCarSubSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).trim(),
  number: Joi.string().alphanum().min(2).max(50).trim(),
  // model: Joi.string().required(),
  year: Joi.number().integer().max(userGlobalConstant.CURRENT_YEAR),
});

module.exports = {
  userCarSubSchema,
};