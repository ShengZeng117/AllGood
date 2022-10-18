const express = require('express')

// create our Router object
const managerRouter = express.Router()

// require our controller
const managerController = require('../controllers/managerController')

managerRouter.get('/', managerController.managerLogin)

/*managerRoute.post(
    '/',
    function (req, res) {
        res.redirect('/manager/' + req.user._id + '/dashboard')
    }
    managerController.getstaffID
)*/

managerRouter.get(
    '/:managers_id/personalpage', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.managerOverview
)

module.exports = managerRouter;