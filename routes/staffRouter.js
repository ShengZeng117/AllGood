const express = require('express')

// create our Router object
const staffRouter = express.Router()

// require our controller
const staffController = require('../controllers/staffController')

staffRouter.get('/', staffController.stafflogIn)
staffRouter.post(
    '/',
    /*function (req, res) {
        res.redirect('/staff/' + req.user._id + '/overview')
    },*/
    staffController.getstaffID
)

staffRouter.get(
    '/:staff_id/personalpage', 
    function staffLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/staff')
    },
    staffController.staffoverview
)

staffRouter.post(
    '/:staff_id/personalpage', 
    function staffLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/staff')
    },
    staffController.inputUsage
)

staffRouter.post(
    '/:staff_id/personalpage', 
    function staffLogin(req, res, next) {
        if (req){
            return next()
        }
        res.redirect('/staff')
    },
    staffController.updatePersonalDetail
)

module.exports = staffRouter;