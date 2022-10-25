const GeneralManager = require('../models/generalManager')
const Device = require('../models/Devices')
const Department = require('../models/Department')
const User = require('../models/User')

const generalmanagerLogin = (req, res) => {
    res.render('manager_loginD.hbs', { layout: 'manager_login'})
}

const generalmanagerOverview = async (req, res, next) => {
    try{
        const generalManager = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!generalManager){
            return res.sendStatus(404)
        }
        const gender = generalManager.Gender
        if(gender == "Male"){
            var genderList = {Male: true, Female: false, other: false}
        }else if(gender == "Female"){
            var genderList = {Male: false, Female: true, other: false}
        }else{
            var genderList = {Male: false, Female: false, other: true}
        }
        
        const allDevicesArray = await Device.find({})
        var allDevicesList = new Array()
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
            allDevicesList.push(onedeviceData)
        }

        const staffList = await User.find({})

        res.render('generalManager_areaD.hbs', {
            layout: 'generalManager_area',
            manager: generalManager,
            AllDeviceList: allDevicesList,
            gender: genderList,
            StaffList: staffList
        })
    }catch(err){
        return next(err)
    }
}

module.exports = {
    generalmanagerLogin,
    generalmanagerOverview,
    //getgeneralmanagerID,
}