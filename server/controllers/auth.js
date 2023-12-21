const config = require("../config");
const bcrypt = require("bcryptjs");
const { userModel } = require("./../models");
const { jwtService } = require("../services");

exports.register = async (req, res) => {
    const hashedPassword = bcrypt.hash(
        inputs.password,
        config.bcrypt.saltRounds
    );
    const createUser = new userModel({
        ...pick(inputs, ["name", "email", "role"]),
        password: hashedPassword,
        status: config.status.ACTIVE,
    });
    const newUser = await createUser.save();
    const token = await jwtService.generateToken(newUser);

    //! transformer
};

exports.login = async (req, res) => {};
exports.forgotPassword = async (req, res) => {};
exports.resetPassword = async (req, res) => {};
