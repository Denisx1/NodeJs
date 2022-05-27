const Joi = require("joi");

const UpdateSheme = Joi.object({
  age: Joi.number().min(2).max(180).required(),
  email: Joi.string().email().lowercase(),
  gender: Joi.string().valid("male", "female"),
});

module.exports = {
  UpdateSheme,
};