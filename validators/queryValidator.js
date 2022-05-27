const Joi = require("joi");

const querySchemaValidator = Joi.object({
  limit: Joi.number().integer().min(1),
  page: Joi.number().integer().min(1),
});

module.exports = {
  querySchemaValidator,
};