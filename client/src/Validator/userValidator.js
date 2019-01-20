const Validator = require("validator");
const checker = require("./is-empty");

module.exports.userInput = data => {
  let errors = {};

  if (!checker.isStringAndNotEmpty(data.name)) errors.name = "Name is required";

  if (!checker.isStringAndNotEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!checker.isNumber(data.contact)) {
    errors.contact = "Contact Number field is a number field";
  }
  if (!checker.isStringAndNotEmpty(data.level)) {
    errors.level = "Level field is required";
  }
  if (!checker.isStringAndNotEmpty(data.institution)) {
    errors.institution = "Institution field is required";
  }

  return {
    errors,
    isValid: checker.isEmpty(errors)
  };
};
