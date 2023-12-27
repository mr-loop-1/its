const jwt = require("jsonwebtoken");
const { userModel } = require("./../models");
const config = require("../config");

exports.authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    console.log("🚀 ~ file: jwt.js:7 ~ token:", token);

    if (!token) {
        return res
            .status(401)
            .json({ error: "Unauthorized - Token not provided" });
    }

    jwt.verify(token.slice(7), config.jwt.secret, async (err, payload) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden - Invalid token" });
        }
        const user = await userModel.findById(payload.id);
        // if (user.status === config.status.INACTIVE) {
        //     throw new error();
        // }
        req.user = user;
        next();
    });
};
