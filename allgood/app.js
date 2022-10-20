const express = require('express')
// Set your app up as an express app
const app = express()

// Set up to handle POST requests
app.use(express.json()) // needed if POST data is in JSON format
// app.use(express.urlencoded())  // only needed for URL-encoded input
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({extname: 'hbs'}));
app.set('view engine', 'hbs')

const login = (req, res) => {
    res.render('select_loginD.hbs', {layout: 'select_login'})
}
app.use('/home', login)

// link to our router
const managerRouter = require('./routes/managerRouter')
const staffRouter = require('./routes/staffRouter')
const generalManagerRouter = require('./routes/generalManagerRouter')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
    next()
})

app.use('/staff', staffRouter)
app.use('/manager', managerRouter)
app.use('/generalManager', generalManagerRouter)

app.listen(process.env.PORT || 8080, () => {
    console.log('The library app is running!')
})
require('./models')