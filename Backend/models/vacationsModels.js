const Joi = require("joi");
//Validate data of vacation
class Vacation {

    constructor(existingVacation) {
        this.vacationUuid = existingVacation.vacationUuid;
        this.destination = existingVacation.destination;
        this.description = existingVacation.description;
        this.fromDate = existingVacation.fromDate;
        this.toDate = existingVacation.toDate;
        this.price = existingVacation.price;
    };

    static #postValidateSchema = Joi.object({
        vacationUuid: Joi.string().optional(),
        destination: Joi.string().min(2).max(14).required(),
        description: Joi.string().min(2).max(5000).required(),
        fromDate: Joi.string().min(10).max(30).required(),
        toDate: Joi.string().min(10).max(30).required(),
        price: Joi.number().min(0).max(10000).required(),
    });

    validatePost() {
        const result = Vacation.#postValidateSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null;
    }

    static #putValidateSchema = Joi.object({
        vacationUuid: Joi.string().required(),
        destination: Joi.string().min(2).max(30).required(),
        description: Joi.string().min(2).max(5000).required(),
        fromDate: Joi.string().min(10).max(100).required(),
        toDate: Joi.string().min(10).max(100).required(),
        price: Joi.number().min(0).max(100000).required(),
    });
    validatePut() {
        const result = Vacation.#putValidateSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null;
    }

}
module.exports = Vacation;