const jwt = require("jsonwebtoken");
const { userModel } = require("./../models");
const config = require("../config");

exports.authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    const projectId = req.params.projectId;

    if (!token) {
        return res
            .status(401)
            .json({ error: "Unauthorized - Token not provided" });
    }

    jwt.verify(token.slice(7), config.jwt.secret, async (err, payload) => {
        if (err) {
            console.log("here");
            return res
                .status(401)
                .json({ error: "Unauthorized - Invalid token" });
        }
        try {
            const user = await userModel.findById(payload.id);
            console.log("here2");
            // if (user.status === config.status.INACTIVE) {
            //     throw new error();
            // }
            req.user = {
                id: user._id,
                email: user.email,
                projects: user.projects,
            };
            next();
        } catch (err) {
            console.log("🚀 ~ file: jwt.js:35 ~ jwt.verify ~ err:", err);
            return res.status(500).json({ error: "Server Error" });
        }
    });
};
