const User = require('../models/User')
const Device = require('../models/Devices')
const Department = require('../models/Department')

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
        if (!staff){
            return res.sendStatus(404)
        }
        const gender = staff.Gender
        if(gender == "Male"){
            var genderList = {Male: true, Female: false, other: false}
        }else if(gender == "Female"){
            var genderList = {Male: false, Female: true, other: false}
        }else{
            var genderList = {Male: false, Female: false, other: true}
        }
        console.log(genderList)
        //find all the devices that this staff are available
        const AvailabledevicesArray = staff.AvailableDevices
        var availableDevicesList = new Array()
        for (let i = 0; i < AvailabledevicesArray.length; i++){
            var onedeviceData = await Device.findById(AvailabledevicesArray[i]).lean()
            availableDevicesList.push(onedeviceData)
        }

        //find all the devices that are in this department
        const department = await Department.findById(staff.DepartmentId).lean()
        const allDevicesArray = department.Devices
        var allDevicesList = new Array()
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
            allDevicesList.push(onedeviceData)
        }

        res.render('staff_areaD.hbs', { 
            layout: 'staff_area',
            staff: staff,
            DeviceList: availableDevicesList,
            AllDeviceList: allDevicesList,
            gender: genderList,
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