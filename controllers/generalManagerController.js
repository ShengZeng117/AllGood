const GeneralManager = require('../models/generalManager')
const Device = require('../models/Devices')
const Department = require('../models/Department')
const User = require('../models/User')
const Manager = require('../models/Manager')
var uuid = require('node-uuid');

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
        var allStaffList = new Array()
        for (let i = 0; i < staffList.length; i++){
            var onestaff = await User.findById(staffList[i]._id).lean()
            allStaffList.push(onestaff)
        }
        const managerList = await Manager.find({})
        var allmanagerList = new Array()
        for (let i = 0; i < managerList.length; i++){
            var onemanager = await Manager.findById(managerList[i]._id).lean()
            allStaffList.push(onemanager)
        }

        res.render('generalManager_areaD.hbs', {
            layout: 'generalManager_area',
            gm: generalManager,
            AllDeviceList: allDevicesList,
            gender: genderList,
            StaffList: allStaffList,
            ManagerList: allmanagerList
        })
    }catch(err){
        return next(err)
    }
}

const createAccount = async (req, res, next) => {
    try {
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm) {
            return res.sendStatus(404)
        }
        var userid1 = uuid.v1();
        
        const Dep = await Department.findOne({DepartmentName: req.body.departmentBox}).lean()


        const info = {
            FirstName: req.body.firstNa,
            LastName: req.body.lastNa,
            Gender: req.body.genderbox,
            Position: req.body.position,
            Email: req.body.email,
            EntryTime: new Date(),
            ContactNumber: req.body.contactNumber,
            StaffId: userid1,
            Age: 22,
            Password: '123456789',
            AvailiableDevices: [],
            Department: req.body.departmentBox,
            DepartmentId: Dep._id
        }

        if(info.Position == 'Staff'){
            const oneuser = new User(info)
            await User.create(oneuser).catch((err) => res.send(err))
            return res.redirect('/generalmanager/' + gm._id + '/personalpage')
        }else{
            const onemanager = new Manager(info)
            await Manager.create(onemanager).catch((err) => res.send(err))
            return res.redirect('/generalmanager/' + gm._id + '/personalpage')
        }
    }
        catch(err){
        return next(err)
    }
}

const updatePersonalDetail = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm) {
            return res.sendStatus(404)
        }
        const firstN = req.body.firstName
        const lastN = req.body.lastName
        const contactN = req.body.Cnumber
        const gen = req.body.gender

        if(!req.body.firstName){
            return next()
        }else if(firstN != gm.FirstName || lastN != gm.LastName || contactN != gm.ContactNumber || gen != gm.Gender){
            console.log("personal")
            gm.FirstName = firstN
            gm.LastName = lastN
            gm.ContactNumber = contactN
            gm.Gender = gen
            await GeneralManager.replaceOne({_id: gm._id}, gm).catch((err) => res.send(err))

            return res.redirect('/generalmanager/' + gm._id + '/personalpage')
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
            const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
            if (!gm) {
                return res.sendStatus(404)
            }
            const newP = req.body.newPassword
            gm.Password = newP
            await GeneralManager.replaceOne({_id: gm._id}, gm).catch((err) => res.send(err))
            return res.redirect('/generalmanager/' + gm._id + '/personalpage')
        }
    }catch(err){
        return next(err)
    }
}

module.exports = {
    generalmanagerLogin,
    generalmanagerOverview,
    createAccount,
    updatePersonalDetail,
    changePassword
}