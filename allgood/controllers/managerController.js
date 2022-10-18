const Manager = require('../models/Manager')
const Device = require('../models/Devices')

const managerLogin = (req, res) => {
    res.render('generalManager_login.hbs', { layout: 'generalManager_loginD', message: req.flash('message') })
}

module.exports = {
    managerLogin
}