const { Schema } = require("mongoose")
const crypto = require("crypto") // for password encryption

const UserSchema = new Schema({
    fullname: String,
    email: String,
    gender: String,
    phone: String,
    isDel: {
        type: Boolean,
        default: false // false means the value is not deleted, true means deleted. this is done to prevent actual deletion of the record
    },
    salt: String,
    hash: String
});


//setting the password for the user created
UserSchema.methods.setPassword = function (password) { 
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 1000, "sha512").toString("hex")
}

//validating the password on login
UserSchema.methods.validatePassword = function (password) { 
    var newhash = crypto.pbkdf2Sync(password, this.salt, 1000, 1000, "sha512").toString("hex")
    return this.hash === newhash // matching with the already created hash in the hash table, if matches login, else not
}

module.exports = UserSchema