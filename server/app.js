require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
    authRouter,
    //     userRouter,
    //     bugRouter,
    projectRouter,
} = require("./routes");
const bodyParser = require("body-parser");

require("./database");
const { userModel, projectsModel } = require("./models");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
    console.log("adsada ");
    res.status(200).send("Server Is Up!");
});

app.use("/auth", authRouter);
// app.use("user", userRouter);
app.use("/projects", projectRouter);
// app.use("bug", bugRouter);

app.use("", (req, res) => {
    res.status(404).send("Not Found");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("listning...");
});
