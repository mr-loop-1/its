const { query, validationResult } = require("express-validator");

exports.handle = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    return next();
};
