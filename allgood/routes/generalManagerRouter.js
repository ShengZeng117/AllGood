const express = require('express')

// create our Router object
const generalManagerRouter = express.Router()

// require our controller
const generalManagerController = require('../controllers/generalManagerController')

generalManagerRouter.get('/', generalManagerController.managerLogin)

generalManagerRouter.post(
    '/',
    /*function (req, res) {
        res.redirect('/manager/' + req.user._id + '/dashboard')
    }*/
    generalManagerController.getmanagerID
)

generalManagerRouter.get(
    '/:generalManager_id/personalpage', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.managerOverview
)

module.exports = generalManagerRouter;