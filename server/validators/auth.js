const validator = require("validator");

exports.register = (req, res, next) => {
    /**
     * * name
     * * email
     * * password
     * * empId
     */

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
        body?.password.length < 5 ||
        body?.password.length > 30
    ) {
        throw new error("password invalid");
    }
    if (
        !body?.name ||
        validator.isEmpty(body?.name) ||
        !validator.isAlpha(body?.name) ||
        body?.name.length < 5 ||
        body?.name.length > 30
    ) {
        throw new error("password invalid");
    }

    return next();
};
