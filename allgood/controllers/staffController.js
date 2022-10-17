const User = require('../models/User')
const Device = require('../models/Devices')

const stafflogIn = (req, res) => {
    res.render('staff_loginD.hbs', { layout: 'staff_login'})
}


module.exports = {
    stafflogIn
}