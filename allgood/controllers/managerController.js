const Manager = require('../models/Manager')
const Device = require('../models/Devices')
const Department = require('../models/Department')

const managerLogin = (req, res) => {
    res.render('manager_loginD.hbs', { layout: 'manager_login'})
}

const managerOverview = async (req, res, next) => {
    try{
        const manager = await Manager.findById(req.params.managers_id).lean()
        if (!manager){
            return res.sendStatus(404)
        }
        const gender = manager.Gender
        if(gender == "Male"){
            var genderList = {Male: true, Female: false, other: false}
        }else if(gender == "Female"){
            var genderList = {Male: false, Female: true, other: false}
        }else{
            var genderList = {Male: false, Female: false, other: true}
        }
        const position = manager.Position
        if (position == "Area"){
            const department = await Department.findById(manager.DepartmentId).lean()
            const allDevicesArray = department.Devices
            var allDevicesList = new Array()
            for (let i = 0; i < allDevicesArray.length; i++){
                var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
                allDevicesList.push(onedeviceData)
            }
        }

        res.render('manager_areaD.hbs', { 
            layout: 'manager_area',
            staff: manager,
            AllDeviceList: allDevicesList,
            gender: genderList,
        })
    }catch(err){
        return next(err)
    }
}

module.exports = {
    managerLogin,
    managerOverview
}