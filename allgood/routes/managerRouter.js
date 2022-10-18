const express = require('express')

// create our Router object
const managerRouter = express.Router()

// require our controller
const managerController = require('../controllers/managerController')

/*managerRouter.get('/', managerController.logIn)
managerRoute.post(
    '/',
    function (req, res) {
        res.redirect('/manager/' + req.user._id + '/dashboard')
    }
)*/

module.exports = managerRouter;