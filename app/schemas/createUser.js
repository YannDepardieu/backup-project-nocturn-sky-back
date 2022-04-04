const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string().alphanum().max(20).required(),
    lastname: Joi.string().alphanum().max(20).required(),
    email: Joi.string().email().max(40).required(),
    password: Joi.string().min(8).max(32).required(),
    role: Joi.string()
        .pattern(/^user$/m)
        .required(),
    notification: Joi.bool(),
    geolocalisation: Joi.bool(),
}).required();
