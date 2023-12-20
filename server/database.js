const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
        app.listen(4001);
    })
    .catch((err) => {
        console.log(err);
    });
