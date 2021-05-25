const Joi = require("joi");
//Validate data of user
class User {

    constructor(existingUsers) {
        this.firstName = existingUsers.firstName;
        this.lastName = existingUsers.lastName;
        this.username = existingUsers.username;
        this.password = existingUsers.password;
    };

    static #postValidateSchema = Joi.object({
        firstName: Joi.string().min(2).max(30).required(),
        lastName: Joi.string().min(2).max(30).required(),
        username: Joi.string().min(2).max(30).required(),
        password: Joi.string().min(8).max(5000).required(),
    });

    validatePost() {
        const result = User.#postValidateSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null;
    }

    static #loginValidateSchema = Joi.object({
        firstName: Joi.string().min(2).max(30).optional(),
        lastName: Joi.string().min(2).max(30).optional(),
        username: Joi.string().min(2).max(30).required(),
        password: Joi.string().min(8).max(5000).required(),
    });

    validateLogin() {
        const result = User.#loginValidateSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null;
    }

}
module.exports = User;