const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/todos')
    }
    res.render('login', {
        title: 'Login'
    })
}

exports.postLogin = (req, res) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) {
        validationErrors.push({msg: 'Pease enter a valid email address.'})
    }
    if (validator.isEmpty(req.body.password)) {
        validationErrors.push({msg: 'Password cannot be blank.'})
    }
    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        console.log(validationErrors)
        return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            req.flash('errors', info)
            return res.redirect('/login')
        }
        req.login(user, (err) => {
            if (err) { return next(err) }
            req.flash('success', {msg: 'Success! You are logged in.'})
            res.redirect(req.session.returnTo || '/todos')
        })
    })(req, res, next)
}