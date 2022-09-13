const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes  = require('./routes/todos')
require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))


app.use(
    session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: false,
    //  cookie: { sameSite: 'strict', secure: true},
     store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is connected, better hop in!')
})