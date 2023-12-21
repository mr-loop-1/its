const { ERROR } = require("../resources");

exports.accessGuard = (accessLevel) => {
    return (req, res, next) => {
        if (accessLevel.includes(req.user.accessLevel)) {
            return next();
        } else {
            throw new error(ERROR.UNAUTHORIZED);
        }
    };
};
