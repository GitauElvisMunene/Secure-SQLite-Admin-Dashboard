const Joi = require('Joi');


//Schema for user registration/login

const userSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    id: Joi.number().optional()
})


module.exports = userSchema;

