const mongoose = require('mongoose');

//Defining the Schema for the users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "partner"],
        required: true,
        default: "user",
    }
})

//Creating the Model of users using the userSchema
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;