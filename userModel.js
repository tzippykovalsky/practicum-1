import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({

    userName: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, unique: true, require: true }

});

export const User = mongoose.model("users", userSchema);

export const userValidator = (userToValidate) => {
    let userJoi = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().custom((value, helpers) => {
            if (value.includes(' ')) {
                return helpers.error('any.invalid');
            }
            return value;
        }).required(),
        phone: Joi.string().required()
    })
    return userJoi.validate(userToValidate);
}

export const userValidatorWithOutEmail = (userToValidate) => {
    let userJoi = Joi.object({
        userName: Joi.string().required(),
        phone: Joi.string().required()
    })
    return userJoi.validate(userToValidate);
}
