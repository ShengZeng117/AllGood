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
managerRouter.get(
    '/:manager_id/createAccount', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.getaccoutPage
)

managerRouter.get(
    '/:manager_id/devices', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.getdevicesdata
)

managerRouter.get(
    '/:manager_id/profile', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.getprofilepage
)

managerRouter.get(
    '/:manager_id/staff', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.getstaffpage
)

managerRouter.get(
    '/:manager_id/department', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.getdepartmentpage
)

managerRouter.get(
    '/:manager_id/:staff_id/staffdetail', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.getstaffdetail
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


managerRouter.post(
    '/:manager_id/profile', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.updatePersonalDetail,
    managerController.changePassword,
)

managerRouter.post(
    '/:manager_id/:staff_id/staffdetail', 
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.editStaff
)

managerRouter.post(
    '/:manager_id/devices',
    function managerLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/manager')
    },
    managerController.deleteDevice,
    managerController.addnewDevice
)

module.exports = managerRouter;