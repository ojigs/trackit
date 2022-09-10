const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const connectDB = require('../config/database')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },

    email: {
        type: String,
        unique: true
    }, 

    password: String
})

//Hash password with bcrypt
UserSchema.pre('save', function (save) {
    const user = this
    if (!user.isModified) {
        return next()
    }
    bcrypt.genSalt(10,  (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})


//Validate user password
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)