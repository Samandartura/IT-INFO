const author_email_pass = require("./author_email_pass.validator");
const author = require("./author.validatior");
const category = require("./category.validator.js");
const user = require("./user.validator");
const admin = require("./admin.validator");

module.exports = {
  author_email_pass,
  author,
  category,
  user,
  admin,
};
