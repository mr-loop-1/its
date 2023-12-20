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

app.use("auth", authRouter);
app.use("user", userRouter);
app.use("project", projectRouter);
app.use("bug", bugRouter);
app.use("admin", adminRouter);

app.listen(process.env.PORT || 5000);
