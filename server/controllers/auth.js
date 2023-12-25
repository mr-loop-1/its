const config = require("../config");
const bcrypt = require("bcryptjs");
const { userModel } = require("./../models");
const { jwtService } = require("../services");

exports.register = async (req, res) => {
    const body = req.body;
    const hashedPassword = bcrypt.hash(
        inputs.password,
        config.bcrypt.saltRounds
    );
    const createUser = new userModel({
        name: body.name,
        email: body.email,
        hashedPassword: hashedPassword,
    });
    const newUser = await createUser.save();
    const token = await jwtService.generateToken(newUser);

    //! transformer

    return res.json(user);
};

exports.login = async (req, res) => {
    const body = req.body;
    const user = await userModel.findOne({ email: body.email });

    if (!user) {
        res.status(404).json("Not found");
    }
    if (!(await bcrypt.compare(body.password, user.hashedPassword))) {
        res.status(401).json("Unauthorized");
    }
    const token = await jwtService.generateToken(newUser);

    //! transformer

    return res.json(user);
};
