const express = require('express')

// create our Router object
const generalManagerRouter = express.Router()

// require our controller
const generalManagerController = require('../controllers/generalManagerController')

generalManagerRouter.get('/', generalManagerController.generalmanagerLogin)

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

generalManagerRouter.post(
    '/:generalManager_id/personalpage', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    generalManagerController.updatePersonalDetail,
    generalManagerController.changePassword,
    generalManagerController.createAccount,
)

module.exports = generalManagerRouter;