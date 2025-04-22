const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  id: Joi.number().optional()
});



module.exports = userSchema;  // Export the schema, not Joi itself