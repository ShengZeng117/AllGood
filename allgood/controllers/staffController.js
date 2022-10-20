const User = require('../models/User')
const Device = require('../models/Devices')
const Department = require('../models/Department')
var moment = require('moment')

const stafflogIn = (req, res) => {
    res.render('staff_loginD.hbs', { layout: 'staff_login'})
}

const getstaffID =  (req, res) => {
    const password = req.body.password
    const email = req.body.email
    User.findOne({Email: email}, async (err, staff) => {
        if (err) {
            return done(err)
        }else if (!staff){
            return done(
                null,
                false
            )
        }else if (password != staff.Password){
            return done(
                null,
                false
            )
        }else{
            return res.redirect('/staff/' + staff._id + '/personalpage')
        }
    })
}

function calculateUsage(energy, list){
    for (let i = 0; i < energy.length; i++){
        var onedeviceData = Device.findById(energy[i]).lean()
        list.mon += onedeviceData.Daily_Energy_Usage[0]
        list.tue += onedeviceData.Daily_Energy_Usage[1]
        list.wed += onedeviceData.Daily_Energy_Usage[2]
        list.thu += onedeviceData.Daily_Energy_Usage[3]
        list.fri += onedeviceData.Daily_Energy_Usage[4]
        list.sta += onedeviceData.Daily_Energy_Usage[5]
        list.sun += onedeviceData.Daily_Energy_Usage[6]
    }
    return list
}
const staffoverview = async (req, res, next) => {
    try{
        const staff = await User.findById(req.params.staff_id).lean()
        if (!staff){
            return res.sendStatus(404)
        }

        //get the gender of this staff
        const gender = staff.Gender
        if(gender == "Male"){
            var genderList = {Male: true, Female: false, other: false}
        }else if(gender == "Female"){
            var genderList = {Male: false, Female: true, other: false}
        }else{
            var genderList = {Male: false, Female: false, other: true}
        }
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

        //Calculate the daily usage of different department according to different energy types
        const cocal = department.Cocal
        var cocalL = {mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sta: 0, sun: 0}
        cocalL = calculateUsage(cocal, cocalL)
        const elec = department.Electricity
        var elecL = {mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sta: 0, sun: 0}
        const NG = department.Natural_Gas
        var NGL = {mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sta: 0, sun: 0}
        const hydrogen = department.Hydrogen
        var hydrogenL = {mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sta: 0, sun: 0}
        const other = department.other
        var otherL = {mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sta: 0, sun: 0}


        res.render('staff_areaD.hbs', { 
            layout: 'staff_area',
            staff: staff,
            DeviceList: availableDevicesList,
            AllDeviceList: allDevicesList,
            gender: genderList,
            cocal: cocalL
        })
    }catch(err){
        return next(err)
    }
}


const inputUsage = async (req, res, next) => {
    try{
        const staff = await User.findById(req.params.staff_id).lean()
        if(!staff){
            return res.sendStatus(404)
        }
        const AvailabledevicesArray = staff.AvailableDevices
        const editUsage = Number(req.body.editU)
        const confirmU =  Number(req.body.confU)
        if(editUsage != confirmU){
            console.log("two input usages are different")
        }else{
            for (let i = 0; i < AvailabledevicesArray.length; i++){
                var onedeviceData = await Device.findById(AvailabledevicesArray[i]).lean()
                if(onedeviceData.Device_name == req.body.confN){
                    break
                }
            }
    
            var date = new Date()
            var Day = moment(date).format('dddd')
            if(Day == "Monday"){
                onedeviceData.Daily_Energy_Usage[0] = editUsage
            }else if(Day == "Tuesday"){
                onedeviceData.Daily_Energy_Usage[1] = editUsage
            }else if(Day == "Wendesday"){
                onedeviceData.Daily_Energy_Usage[2] = editUsage
                //dailyU[2] = editUsage
            }else if(Day == "Thursday"){
                onedeviceData.Daily_Energy_Usage[3] = editUsage
                //oneDevice.Daily_Energy_Usage[3] = editUsage
            }else if(Day == "Friday"){
                onedeviceData.Daily_Energy_Usage[4] = editUsage
            }else if(Day == "Saturday"){
                onedeviceData.Daily_Energy_Usage[5] = editUsage
            }else if (Day == "Sunday"){
                onedeviceData.Daily_Energy_Usage[6] = editUsage
            }
    
            let weeklyU = 0
            for (i = 0; i < 7; i++){
                weeklyU += onedeviceData.Daily_Energy_Usage[i]
            }
    
            onedeviceData.Week_Energy_Usage = weeklyU
    
            await Device.replaceOne({_id: onedeviceData._id}, onedeviceData).catch((err) => res.send(err))
        }
        return res.redirect('/staff/' + staff._id + '/personalpage')



    }catch(err){
        return next(err)
    }
}

const updatePersonalDetail = async (req, res, next) => {
    console.log(req.query)
    return res.redirect('/staff/' + staff._id + '/personalpage')
}


module.exports = {
    stafflogIn,
    staffoverview,
    getstaffID,
    inputUsage,
    updatePersonalDetail
}