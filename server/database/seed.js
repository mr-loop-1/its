const Users = require("../models/users");
const mongoose = require("mongoose");
require("dotenv").config();

const users = require("./seeds/projects.json");
const projectsModel = require("../models/projects");
//create your array. i inserted only 1 object here
// const products = users.map(
//     (user) =>
//         new Users({
//             name: user.name,
//             hashedPassword: user.hashedPassword,
//             email: user.email,
//         })
// );

const products = users.map((user) => new projectsModel(user));
// //connect mongoose
mongoose
    .connect("mongodb://localhost:27017/its-1")
    .catch((err) => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to db in development environment");
    });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
products.forEach(async (p, index) => {
    await p.save();
    console.log("done");
});
