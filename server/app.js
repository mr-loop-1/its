const express = require("express");
const cors = require("cors");
const {
    adminRouter,
    authRouter,
    userRouter,
    bugRouter,
    projectRouter,
} = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("ping", (req, res) => {
    res.statusCode(200).send("Server Is Up!");
});

app.use("auth", authRouter);
app.use("user", userRouter);
app.use("project", projectRouter);
app.use("bug", bugRouter);
app.use("admin", adminRouter);

app.use("", (req, res) => {
    res.statusCode(404).send("Not Found");
});

app.listen(process.env.PORT || 5000);
