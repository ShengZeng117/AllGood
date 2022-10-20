const Manager = require('../models/Manager')
const GeneralManager = require('../models/generalManager')
const Device = require('../models/Devices')
const Department = require('../models/Department')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

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
            GeneralManager.findOne({Email: email}, async (err, generalManager) => {
                if (err) {
                    return done(err)
                }else if (!generalManager){
                    return done(
                        null,
                        false
                    )
                }else if (password != generalManager.Password){
                    return done(
                        null,
                        false
                    )
                }else{
                    return res.redirect('/generalManager/' + generalManager._id + '/personalpage')
                }
            })
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

        const staffList = await User.find({Department: manager.Department}).lean()

        res.render('managersD.hbs', { 
            layout: 'managers',
            manager: manager,
            AllDeviceList: allDevicesList,
            gender: genderList,
            StaffList: staffList
        })
    }catch(err){
        return next(err)
    }
}

const createAccount = async (req, res, next) => {
    try {
        const manager = await Manager.findById(req.params.manager_id).lean()
        const department = await Department.findById(manager.DepartmentId).lean()
        if (!manager) {
            return res.sendStatus(404)
        }

        const info = {
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Gender: req.body.genderbox,
            Position: req.body.position,
            Email: req.body.email,
            EntryTime: new Date(),
            ContactNumber: req.body.contactNum,
            StaffId: '1174109',
            Age: 22,
            Password: '123456789',
            Permission: "Department Manager",
            AvailiableDevices: department.Devices,
            Department: "IT",
            DepartmentId: ObjectId(manager.DepartmentId.str)
        }
        const oneuser = new User(info)
        await User.create(oneuser).catch((err) => res.send(err))
        return res.redirect('/manager/' + manager._id + '/personalpage')
    }
        catch(err){
        return next(err)
    }
}

module.exports = {
    managerLogin,
    managerOverview,
    getmanagerID,
    createAccount
}