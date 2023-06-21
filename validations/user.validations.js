const Joi = require("joi");

exports.userValidation = (data) => {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        user_email: Joi.string().required().email(),
        user_password: Joi.string().required().min(6),
        user_info: Joi.string().required(),
        user_photo: Joi.string().default("/users/user.jpg"),
        user_is_active: Joi.boolean().default(true),
    });
    return schema.validate(data, { abortEarly: false });
};
