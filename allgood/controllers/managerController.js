const Manager = require('../models/Manager')
const Device = require('../models/Devices')
const Department = require('../models/Department')

const managerLogin = (req, res) => {
    res.render('manager_loginD.hbs', { layout: 'manager_login'})
}

const getmanagerID =  (req, res) => {
    const password = req.body.password
    const email = req.body.email
    Manager.findOne({Email: email}, async (err, manager) => {
        if (err) {
            return done(err)
        }else if (!manager){
            return done(
                null,
                false
            )
        }else if (password != manager.Password){
            return done(
                null,
                false
            )
        }else{
            return res.redirect('/manager/' + manager._id + '/personalpage')
        }
    })
}

const managerOverview = async (req, res, next) => {
    try{
        const manager = await Manager.findById(req.params.manager_id).lean()
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

        res.render('managersD.hbs', { 
            layout: 'managers',
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
    managerOverview,
    getmanagerID
}