const Joi = require("joi");

const authorSchema = Joi.object({
  author_first_name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]{2,50}$"))
    .required(),
  author_last_name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]{2,50}$"))
    .required(),
  author_nick_name: Joi.string().max(20),
  author_email: Joi.string().email(),
  author_phone: Joi.string(),
  author_password: Joi.string().min(6).max(20),
  confirm_password: Joi.ref("author_password"),
  author_info: Joi.string(),
  author_position: Joi.string(),
  author_photo: Joi.string().default("/author/avatar.jpg"),
  is_expert: Joi.boolean().default(false),
});

module.exports = authorSchema;

// exports.authorValidation = (data) => {
//     return schema.validate(data, { abortEarly: false });
// };
