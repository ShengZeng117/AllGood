const Manager = require('../models/Manager')
const GeneralManager = require('../models/generalManager')
const Device = require('../models/Devices')
const Department = require('../models/Department')
const User = require('../models/User')
var uuid = require('node-uuid');

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
                    return res.redirect('/manager')
                }else if (password != generalManager.Password){
                    return res.redirect('/manager')
                }else{
                    return res.redirect('/generalManager/' + generalManager._id + '/personalpage')
                }
            })
        }else if (password != manager.Password){
            return res.redirect('/manager')
        }else{
            return res.redirect('/manager/' + manager._id + '/personalpage')
        }
    })
}

const managerOverview = async (req, res, next) => {
    try{
        const am = await Manager.findById(req.params.manager_id).lean()
        if (!am){
            return res.sendStatus(404)
        }
        const amD = {
            check: false,
            _id: am._id,
            Id: am.Id,
            FirstName: am.FirstName,
            LastName: am.LastName,
            Gender: am.Gender,
            Position: am.Position,
            Email: am.Email,
            ContactNumber: am.ContactNumber,
            Age: am.Age,
            Password: am.Password,
            Department: am.Department,
            DepartmentId: am.DepartmentId
        }
        const position = am.Position
        if (position == "Area"){
            const department = await Department.findById(am.DepartmentId).lean()
            const allDevicesArray = department.Devices
            var allDevicesList = new Array()
            for (let i = 0; i < allDevicesArray.length; i++){
                var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
                allDevicesList.push(onedeviceData)
            }
        }

        res.render('generalManager_areaD.hbs', {
            layout: 'generalManager_area',
            gm: amD,
            AllDeviceList: allDevicesList,
        })
    }catch(err){
        return next(err)
    }
}

const getaccoutPage = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: false,
            _id: gm._id,
            Id: gm.Id,
            FirstName: gm.FirstName,
            LastName: gm.LastName,
            Gender: gm.Gender,
            Position: gm.Position,
            Email: gm.Email,
            ContactNumber: gm.ContactNumber,
            Age: gm.Age,
            Password: gm.Password,
            Department: gm.Department,
            DepartmentId: gm.DepartmentId
        }
        res.render('gm_accountD.hbs', { 
            layout: 'gm_account',
            gm: gmD
        })
    }catch(err){
        return next(err)
    }
}

const getdevicesdata = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: false,
            _id: gm._id,
            Id: gm.Id,
            FirstName: gm.FirstName,
            LastName: gm.LastName,
            Gender: gm.Gender,
            Position: gm.Position,
            Email: gm.Email,
            ContactNumber: gm.ContactNumber,
            Age: gm.Age,
            Password: gm.Password,
            Department: gm.Department,
            DepartmentId: gm.DepartmentId
        }

        const allDevicesArray = await Device.find({})
        var allDevicesList = new Array()
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
            allDevicesList.push(onedeviceData)
        }
        const checkmanager = {gm: true}
        res.render('gm_dataD.hbs', {
            layout: 'gm_data',
            gm: gmD,
            checkm: checkmanager,
            AllDeviceList: allDevicesList
        })
    }catch(err){
        return next(err)
    }
}

const getprofilepage = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: false,
            _id: gm._id,
            Id: gm.Id,
            FirstName: gm.FirstName,
            LastName: gm.LastName,
            Gender: gm.Gender,
            Position: gm.Position,
            Email: gm.Email,
            ContactNumber: gm.ContactNumber,
            Age: gm.Age,
            Password: gm.Password,
            Department: gm.Department,
            DepartmentId: gm.DepartmentId
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
            gm: gmD,
            gender: genderList,
        })
    }catch(err){
        return next(err)
    }
}

const getstaffpage = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: false,
            _id: gm._id,
            Id: gm.Id,
            FirstName: gm.FirstName,
            LastName: gm.LastName,
            Gender: gm.Gender,
            Position: gm.Position,
            Email: gm.Email,
            ContactNumber: gm.ContactNumber,
            Age: gm.Age,
            Password: gm.Password,
            Department: gm.Department,
            DepartmentId: gm.DepartmentId
        }
        const staffList = await User.find({})
        var allStaffList = new Array()
        for (let i = 0; i < staffList.length; i++){
            var onestaff = await User.findById(staffList[i]._id).lean()
            allStaffList.push({
                check: false,
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
        
        var allmanagerList = new Array()

        res.render('gm_staffD.hbs', { 
            layout: 'gm_staff',
            gm: gmD,
            StaffList: allStaffList,
            ManagerList: allmanagerList
        })
    }catch(err){
        return next(err)
    }
}

const getdepartmentpage = async (req, res, next) => {
    try {
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: false,
            _id: gm._id,
            Id: gm.Id,
            FirstName: gm.FirstName,
            LastName: gm.LastName,
            Gender: gm.Gender,
            Position: gm.Position,
            Email: gm.Email,
            ContactNumber: gm.ContactNumber,
            Age: gm.Age,
            Password: gm.Password,
            Department: gm.Department,
            DepartmentId: gm.DepartmentId
        }
        const deList = await Department.find({})
        var alldeList = new Array()
        for (let i = 0; i < deList.length; i++){
            var onede = await Department.findById(deList[i]._id).lean()
            alldeList.push(onede)
        }
        res.render('gm_departmentD.hbs', { 
            layout: 'gm_department',
            gm: gmD,
            DeList: alldeList
        })
    }catch(err){
        return next(err)
    }
}

const getstaffdetail = async (req, res, next) => {
    try {
        const gm = await Manager.findById(req.params.manager_id).lean()
        const onestaff = await User.findById(req.params.staff_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: false,
            _id: gm._id,
            Id: gm.Id,
            FirstName: gm.FirstName,
            LastName: gm.LastName,
            Gender: gm.Gender,
            Position: gm.Position,
            Email: gm.Email,
            ContactNumber: gm.ContactNumber,
            Age: gm.Age,
            Password: gm.Password,
            Department: gm.Department,
            DepartmentId: gm.DepartmentId
        }
        res.render('gm_staffdetailD.hbs', { 
            layout: 'gm_staffdetail',
            gm: gmD,
            staff:onestaff
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

        var userid1 = uuid.v1();

        const info = {
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Gender: req.body.genderbox,
            Position: req.body.position,
            Email: req.body.email,
            EntryTime: new Date(),
            ContactNumber: req.body.contactNum,
            StaffId: userid1,
            Age: 0,
            Password: '123456789',
            AvailiableDevices: [],
            Department: "IT",
            DepartmentId: manager.DepartmentId
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
    getaccoutPage,
    getdevicesdata,
    getprofilepage,
    getstaffpage,
    getstaffdetail,
    getdepartmentpage,
    getmanagerID,
    createAccount
}