const validator = require("validator");

exports.register = (req, res, next) => {
    const body = req?.body;

    if (
        !body?.email ||
        validator.isEmpty(body?.email) ||
        !validator.isEmail(body?.email)
    ) {
        throw new error("email invalid");
    }
    if (
        !body?.password ||
        validator.isEmpty(body?.password) ||
        !validator.isLength(body?.password, { min: 5, max: 30 })
    ) {
        throw new error("password invalid");
    }
    if (
        !body?.name ||
        validator.isEmpty(body?.name) ||
        !validator.isAlpha(body?.name) ||
        !validator.isLength(body?.name, { min: 5, max: 30 })
    ) {
        throw new error("password invalid");
    }

    return next();
};

exports.login = (req, res, next) => {};
