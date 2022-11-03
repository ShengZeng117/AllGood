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

generalManagerRouter.get(
    '/:generalManager_id/createAccount', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.getaccoutPage
)

generalManagerRouter.get(
    '/:generalManager_id/devices', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.getdevicesdata
)

generalManagerRouter.get(
    '/:generalManager_id/profile', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.getprofilepage
)

generalManagerRouter.get(
    '/:generalManager_id/staff', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.getstaffpage
)

generalManagerRouter.get(
    '/:generalManager_id/department', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.getdepartmentpage
)

generalManagerRouter.get(
    '/:generalManager_id/:staff_id/staffdetail', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.getstaffdetail
)

generalManagerRouter.post(
    '/:generalManager_id/createAccount', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.createAccount
)

generalManagerRouter.post(
    '/:generalManager_id/profile', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.updatePersonalDetail,
    generalManagerController.changePassword,
)
generalManagerRouter.post(
    '/:generalManager_id/department', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.editdepartment
)
generalManagerRouter.post(
    '/:generalManager_id/:staff_id/staffdetail', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.editStaff
)

generalManagerRouter.post(
    '/:generalManager_id/devices',
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/generalManager')
    },
    generalManagerController.deleteDevice,
    generalManagerController.addnewDevice
)


module.exports = generalManagerRouter;