const User = require('../models/User')
const Device = require('../models/Devices')

const stafflogIn = (req, res) => {
    res.render('staff_loginD.hbs', { layout: 'staff_login'})
}

const getstaffID =  (req, res) => {
    const password = req.body.password
    console.log(password)
    const email = req.body.email
    console.log(email)
    User.findOne({Email: email}, async (err, staff) => {
        if (err) {
            return done(err)
        }else if (!staff){
            //console.log(1)
            return done(
                null,
                false
            )
        }else if (password != staff.password){
            //console.log(1)
            return done(
                null,
                false
            )
        }else{
            return done(
                null,
                staff
            )
        }
    })
    if(staff){
        return res.redirect('/staff/' + staff._id + '/personalpage')
    }else{
        console.log(1)
        return res.redirect('/staff/')
    }
    //res.render('staff_areaD.hbs', { layout: 'staff_area'})
}

const staffoverview = async (req, res, next) => {
    try{
        const staff = await User.findById(req.params.staff_id).lean()
        const deviceArray = staff.AvailableDevices
        console.log(staff.AvailableDevices)
        var deviceList = new Array()
        for (let i = 0; i < deviceArray.length; i++){
            var onedeviceData = await Device.findById(deviceArray[i]).lean()
            deviceList.push(onedeviceData)
        }
        if (!staff){
            return res.sendStatus(404)
        }
        var router = {staffId: staff._id}
        res.render('staff_areaD.hbs', { 
            layout: 'staff_area',
            staff: staff,
            DeviceList: deviceList,
        })
    }catch(err){
        return next(err)
    }
}



module.exports = {
    stafflogIn,
    staffoverview,
    getstaffID
}