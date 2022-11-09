const User = require('../models/User')
const Device = require('../models/Devices')
const Department = require('../models/Department')
var moment = require('moment')
var ImageM = require('../models/image');

const stafflogIn = (req, res) => {
    res.render('staff_loginD.hbs', { layout: 'staff_login', message: false})
}

const getstaffID =  (req, res) => {
    const password = req.body.password
    const email = req.body.email
    User.findOne({Email: email}, async (err, staff) => {
        if (err) {
            return done(err)
        }else if (!staff){
            res.render('staff_loginD.hbs', { layout: 'staff_login', message: true})
        }else if (password != staff.Password){
            res.render('staff_loginD.hbs', { layout: 'staff_login', message: true})
        }else{
            return res.redirect('/staff/' + staff._id + '/personalpage')
        }
    })
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
            const oneimg = await ImageM.findById(onedeviceData.image).lean()
            availableDevicesList.push({
                Device_name: onedeviceData.Device_name,
                _id: onedeviceData._id,
                Week_Energy_Usage: onedeviceData.Week_Energy_Usage,
                image: oneimg.data.toString("base64"),
                type: oneimg.type,
            })
        }
        //find all the devices that are in this department
        const department = await Department.findById(staff.DepartmentId).lean()
        const allDevicesArray = department.Devices
        var allDevicesList = new Array()
        var elecdailyU = [0,0,0,0,0,0,0]
        var coaldailyU = [0,0,0,0,0,0,0]
        var hydailyU = [0,0,0,0,0,0,0]
        var gasdailyU = [0,0,0,0,0,0,0]
        var otherdailyU = [0,0,0,0,0,0,0]
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]._id).lean()
            allDevicesList.push(onedeviceData)
            var dailyU_array = onedeviceData.Daily_Energy_Usage
            if(onedeviceData.Energy_type == "electricity"){
                for(let i = 0; i < 7; i++){
                    elecdailyU[i] += dailyU_array[i]
                }
            }else if(onedeviceData.Energy_type == "coal"){
                for(let i = 0; i < 7; i++){
                    coaldailyU[i] += dailyU_array[i]
                }
            }else if(onedeviceData.Energy_type == "gas"){
                for(let i = 0; i < 7; i++){
                    gasdailyU[i] += dailyU_array[i]
                }
            }else if(onedeviceData.Energy_type == "hydrogen"){
                for(let i = 0; i < 7; i++){
                    hydailyU[i] += dailyU_array[i]
                }
            }else{
                for(let i = 0; i < 7; i++){
                    otherdailyU[i] += dailyU_array[i]
                }
            }
        }

        var dailyUsage = {
            electricity: elecdailyU,
            coal: coaldailyU,
            hydrogen: hydailyU,
            gas: gasdailyU,
            other: otherdailyU,
        }

        var elecPercent = caculateoercentage(elecdailyU);
        var coalPercent = caculateoercentage(coaldailyU);
        var hydrogenPercent = caculateoercentage(hydailyU);
        var gasPercent = caculateoercentage(gasdailyU);
        var otherPercent = caculateoercentage(otherdailyU);
        var dailyUPercent = {
            electricity: elecPercent,
            coal: coalPercent,
            hydrogen: hydrogenPercent,
            gas: gasPercent,
            other: otherPercent,
        }


        res.render('staff_areaD.hbs', { 
            layout: 'staff_area',
            staff: staff,
            DeviceList: availableDevicesList,
            AllDeviceList: allDevicesList,
            gender: genderList,
            dailyArray: dailyUsage,
            dailyP: dailyUPercent
        })
    }catch(err){
        return next(err)
    }
}

function caculateoercentage(a){
    var total = 0
    var b = new Array()
    for(let i = 0; i < a.length; i++){
        total += a[i]
    }
    if(total == 0){
        b = [0,0,0,0,0,0,0]
    }else{
        for(let i = 0; i < a.length; i++){
            b.push(a[i] /total)
        }
    }
    return b
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
        let onedeviceData
        if(editUsage != confirmU){
            console.log("two input usages are different")
        }else{
            for (let i = 0; i < AvailabledevicesArray.length; i++){
                onedeviceData = await Device.findById(AvailabledevicesArray[i]).lean()
                if(onedeviceData.Device_name == req.body.confN){
                    break
                }
            }

            let date = new Date()
            let Day = moment(date).format('dddd')
            if(Day == "Monday"){
                onedeviceData.Daily_Energy_Usage.splice(0,1,editUsage)
            }else if(Day == "Tuesday"){
                onedeviceData.Daily_Energy_Usage[1] = editUsage
            }else if(Day == "Wednesday"){
                onedeviceData.Daily_Energy_Usage.splice(2,1,editUsage)
            }else if(Day == "Thursday"){
                onedeviceData.Daily_Energy_Usage[3] = editUsage
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
            if( (onedeviceData.Min < weeklyU) && (weeklyU < onedeviceData.Max)){
                onedeviceData.Status = true
            }else{
                onedeviceData.Status = false
            }
    
            await Device.replaceOne({_id: onedeviceData._id}, onedeviceData).catch((err) => res.send(err))
        }
        return res.redirect('/staff/' + staff._id + '/personalpage')



    }catch(err){
        return next(err)
    }
}

const updatePersonalDetail = async (req, res, next) => {
    try{
        const staff = await User.findById(req.params.staff_id).lean()
        if(!staff){
            return res.sendStatus(404)
        }
        const firstN = req.body.firstName
        const lastN = req.body.lastName
        const contactN = req.body.Cnumber
        const gen = req.body.gender

        if(!req.body.firstName){
            return next()
        }else if(firstN != staff.FirstName || lastN != staff.LastName || contactN != staff.ContactNumber || gen != staff.Gender){
            staff.FirstName = firstN
            staff.LastName = lastN
            staff.ContactNumber = contactN
            staff.Gender = gen
            await User.replaceOne({_id: staff._id}, staff).catch((err) => res.send(err))

            return res.redirect('/staff/' + staff._id + '/personalpage')
        }else{
            return next()
        }
    }catch(err){
        return next(err)
    }
}

const changePassword = async (req, res, next) => {
    try{
        if(!req.body.newPassword){
            return next()
        }else{
            const staff = await User.findById(req.params.staff_id).lean()
            if(!staff){
                return res.sendStatus(404)
            }
            const newP = req.body.newPassword
            staff.Password = newP
            await User.replaceOne({_id: staff._id}, staff).catch((err) => res.send(err))
            return res.redirect('/staff/' + staff._id + '/personalpage')
        }
    }catch(err){
        return next(err)
    }
}



module.exports = {
    stafflogIn,
    staffoverview,
    getstaffID,
    inputUsage,
    updatePersonalDetail,
    changePassword,
}