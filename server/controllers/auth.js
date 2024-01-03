const config = require("../config");
const bcrypt = require("bcryptjs");
const { userModel } = require("./../models");
const { jwtService } = require("../services");
const { userTransformer } = require("../transformers");

exports.register = async (req, res) => {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(
        body.password,
        config.bcrypt.saltRounds
    );
    const createUser = new userModel({
        name: body.name,
        email: body.email,
        hashedPassword: hashedPassword,
        slug: body.slug,
    });
    const newUser = await createUser.save();
    const token = await jwtService.generateToken(newUser);

    const data = userTransformer.userToken(newUser, token);

    return res.json(data);
};

exports.login = async (req, res) => {
    console.log("insd akd");
    const body = req.body;
    const user = await userModel.findOne({ email: body.email });

    if (!user) {
        return res.status(404).json("Not found");
    }
    if (!(await bcrypt.compare(body.password, user.hashedPassword))) {
        return res.status(401).json("Unauthorized");
    }
    const token = await jwtService.generateToken(user);

    const data = userTransformer.userToken(user, token);

    return res.json(data);
};

exports.ping = async (req, res) => {
    const body = req.body;
    const user = await userModel.findOne({ email: body.email });
    if (user) {
        return res.status(200).json({ data: true });
    }
    return res.status(200).json({ data: false });
};
