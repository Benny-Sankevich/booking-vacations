const Joi = require("joi");
//Validate data of follow vacation
class FollowsVacation {

    constructor(existingFollowsVacation) {
        this.userId = existingFollowsVacation.userId;
        this.vacationId = existingFollowsVacation.vacationId;
    };

    static #postValidateSchema = Joi.object({
        userId: Joi.number().required().integer(),
        vacationId: Joi.number().required().integer(),
    });

    validatePost() {
        const result = FollowsVacation.#postValidateSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null;
    }
}
module.exports = FollowsVacation;