const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    phone: { type: String, maxlength: 13 },
    balance: { type: Number, default: 0 },
    status: { type: Number },                   // 0 - if balance equals 0, 1 - balance more than 0
    password: { type: String, maxlength: 12 },
    createdAt: { type: Date, default: new Date() },
})

UserSchema.methods.comparePassword = function (candidate) {
    return this.password.localeCompare(candidate) == 0
}

const User = mongoose.model('users', UserSchema)

module.exports.User = User