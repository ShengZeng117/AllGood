const express = require('express')

// create our Router object
const managerRouter = express.Router()

// require our controller
const managerController = require('../controllers/managerController')

managerRouter.get('/', managerController.managerLogin)

managerRouter.post(
    '/',
    /*function (req, res) {
        res.redirect('/manager/' + req.user._id + '/dashboard')
    }*/
    managerController.getmanagerID
)

managerRouter.get(
    '/:manager_id/personalpage', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.managerOverview
)

managerRouter.post(
    '/:manager_id/personalpage', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.createAccount
)

module.exports = managerRouter;