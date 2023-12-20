const mongoose = require("mongoose");
mongoose.Types.ObjectId();

var userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    empId: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    roleId: {
        type: String,
    },
    dateRegistered: {
        type: String,
    },
    ipAddress: {
        type: String,
    },
});

UsersModel = mongoose.model("usersCollection", userSchema);

module.exports = UsersModel;
