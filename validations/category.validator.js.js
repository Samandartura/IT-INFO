const Joi = require("joi");

const categorySchema = Joi.object({
  category_name: Joi.string()
    .min(2)
    .message("Kategoriya nomi 2 ta harfdan kam bo'lmasligi kerak!")
    .max(255)
    .message("Kategoriya nomi 255 ta harfdan uzun bo'lmasligi kerak")
    .required(),
  parent_category_id: Joi.string()
    .alphanum()
    .message("Faqat harf va son bo'lishi kerak"),
});
module.exports = categorySchema;
