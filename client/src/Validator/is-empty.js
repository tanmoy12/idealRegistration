const Validator = require("validator");

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

const isString = value => value && typeof value === "string";

const isNumber = value => value && !isNaN(value);

const isBoolean = value => typeof value === typeof true;

const isStringAndNotEmpty = value =>
    value && typeof value === "string" && value.trim().length !== 0;

const isObject = value => value && typeof value === "object";

const isObjectAndNotEmpty = value =>
    value && typeof value === "object" && Object.keys(value).length !== 0;

const isArray = value => value && Array.isArray(value);

const isArrayAndNotEmpty = value =>
    value && Array.isArray(value) && value.length;

const isDate = value => value && !isNaN(Date.parse(value));

const isMongoId = value =>
    value && isString(value) && Validator.isMongoId(value);

module.exports = {
    isEmpty,
    isNumber,
    isBoolean,
    isString,
    isStringAndNotEmpty,
    isObject,
    isObjectAndNotEmpty,
    isArray,
    isArrayAndNotEmpty,
    isDate,
    isMongoId
};
