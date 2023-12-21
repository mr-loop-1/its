const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = async (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        role: user.role,
    };
    return await jwt.sign(payload, config.jwt.secret);
};
