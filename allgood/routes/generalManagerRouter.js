const express = require('express')

// create our Router object
const generalManagerRouter = express.Router()

// require our controller
const generalManagerController = require('../controllers/generalManagerController')

generalManagerRouter.get('/', generalManagerController.generalmanagerLogin)

/*generalManagerRouter.post(
    '/',
    /*function (req, res) {
        res.redirect('/manager/' + req.user._id + '/dashboard')
    }*/
    //generalManagerController.getgeneralmanagerID
//)

generalManagerRouter.get(
    '/:generalManager_id/personalpage', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.generalmanagerOverview
)

module.exports = generalManagerRouter;