const express = require('express')

// create our Router object
const staffRouter = express.Router()

// require our controller
const staffController = require('../controllers/staffController')

staffRouter.get('/', staffController.stafflogIn)
/*staffRoute.post(
    '/',
    function (req, res) {
        res.redirect('/staff/' + req.user._id + '/overview')
    }
)*/

module.exports = staffRouter;