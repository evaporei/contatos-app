const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    username: String,
    salt: String,
    password_hash: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }]
})

const contactSchema = new Schema({
    name: String,
    phone: [String],
    _creator: [{ type: String, ref: "User" }]
})

const User = mongoose.model("User", userSchema)
const Contact = mongoose.model("Contact", contactSchema)

module.exports = { User, Contact }