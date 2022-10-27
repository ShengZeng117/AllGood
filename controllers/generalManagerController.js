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

        const allDevicesArray = await Device.find({})
        var allDevicesList = new Array()
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
            allDevicesList.push(onedeviceData)
        }

        res.render('generalManager_areaD.hbs', {
            layout: 'generalManager_area',
            gm: generalManager,
            AllDeviceList: allDevicesList,
        })
    }catch(err){
        return next(err)
    }
}

const getaccoutPage = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        res.render('gm_accountD.hbs', { 
            layout: 'gm_account',
            gm: gm
        })
    }catch(err){
        return next(err)
    }
}

const getdevicesdata = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const allDevicesArray = await Device.find({})
        var allDevicesList = new Array()
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
            allDevicesList.push(onedeviceData)
        }
        res.render('gm_dataD.hbs', {
            layout: 'gm_data',
            gm: gm,
            AllDeviceList: allDevicesList
        })
    }catch(err){
        return next(err)
    }
}

const getprofilepage = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gender = gm.Gender
        if(gender == "Male"){
            var genderList = {Male: true, Female: false, other: false}
        }else if(gender == "Female"){
            var genderList = {Male: false, Female: true, other: false}
        }else{
            var genderList = {Male: false, Female: false, other: true}
        }

        res.render('gm_profileD.hbs', { 
            layout: 'gm_profile',
            gm: gm,
            gender: genderList,
        })
    }catch(err){
        return next(err)
    }
}

const getstaffpage = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const staffList = await User.find({})
        var allStaffList = new Array()
        for (let i = 0; i < staffList.length; i++){
            var onestaff = await User.findById(staffList[i]._id).lean()
            allStaffList.push({
                gm_id: gm._id,
                staff_id: onestaff._id,
                FirstName: onestaff.FirstName,
                LastName: onestaff.LastName,
                Gender: onestaff.Gender,
                Position: onestaff.Position,
                Email: onestaff.Email,
                ContactNumber: onestaff.ContactNumber,
                StaffId: onestaff.StaffId,
                Age: onestaff.Age,
                Password: onestaff.Password,
                AvailiableDevices: onestaff.AvailiableDevices,
                Department: onestaff.Department,
                DepartmentId: onestaff.DepartmentId
        })
        }
        const managerList = await Manager.find({})
        var allmanagerList = new Array()
        for (let i = 0; i < managerList.length; i++){
            var onemanager = await Manager.findById(managerList[i]._id).lean()
            allStaffList.push({
                gm_id: gm._id,
                staff_id: onemanager._id,
                FirstName: onemanager.FirstName,
                LastName: onemanager.LastName,
                Gender: onemanager.Gender,
                Position: onemanager.Position,
                Email: onemanager.Email,
                ContactNumber: onemanager.ContactNumber,
                StaffId: onemanager.StaffId,
                Age: onemanager.Age,
                Password: onemanager.Password,
                Department: onemanager.Department,
                DepartmentId: onemanager.DepartmentId
        })
        }

        res.render('gm_staffD.hbs', { 
            layout: 'gm_staff',
            gm: gm,
            StaffList: allStaffList,
            ManagerList: allmanagerList
        })
    }catch(err){
        return next(err)
    }
}

const getdepartmentpage = async (req, res, next) => {
    try {
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const deList = await Department.find({})
        var alldeList = new Array()
        for (let i = 0; i < deList.length; i++){
            var onede = await Department.findById(deList[i]._id).lean()
            alldeList.push(onede)
        }
        res.render('gm_departmentD.hbs', { 
            layout: 'gm_department',
            gm: gm,
            DeList: alldeList
        })
    }catch(err){
        return next(err)
    }
}

const getstaffdetail = async (req, res, next) => {
    try {
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        const onestaff = await User.findById(req.params.staff_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        res.render('gm_staffdetailD.hbs', { 
            layout: 'gm_staffdetail',
            gm: gm,
            staff:onestaff
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
            Age: 0,
            Password: '123456789',
            AvailiableDevices: [],
            Department: req.body.departmentBox,
            DepartmentId: Dep._id
        }

        if(info.Position == 'Staff'){
            const oneuser = new User(info)
            await User.create(oneuser).catch((err) => res.send(err))
            return res.redirect('/generalmanager/' + gm._id + '/createAccount')
        }else{
            const onemanager = new Manager(info)
            await Manager.create(onemanager).catch((err) => res.send(err))
            return res.redirect('/generalmanager/' + gm._id + '/createAccounte')
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

            return res.redirect('/generalmanager/' + gm._id + '/profile')
        }else{
            return next()
        }
    }catch(err){
        return next(err)
    }
}

const changePassword = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm) {
            return res.sendStatus(404)
        }
        const newP = req.body.newPassword
        gm.Password = newP
        await GeneralManager.replaceOne({_id: gm._id}, gm).catch((err) => res.send(err))
        return res.redirect('/generalmanager/' + gm._id + '/profile')
    }catch(err){
        return next(err)
    }
}

module.exports = {
    generalmanagerLogin,
    getaccoutPage,
    getdevicesdata,
    getprofilepage,
    getstaffpage,
    getstaffdetail,
    getdepartmentpage,
    generalmanagerOverview,
    createAccount,
    updatePersonalDetail,
    changePassword
}