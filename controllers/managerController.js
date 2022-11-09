const Manager = require('../models/Manager')
const GeneralManager = require('../models/generalManager')
const Device = require('../models/Devices')
const Department = require('../models/Department')
const User = require('../models/User')
var uuid = require('node-uuid');
var ImageM = require('../models/image');
const { connect } = require('mongoose')

const managerLogin = (req, res) => {
    res.render('manager_loginD.hbs', { layout: 'manager_login', message: false})
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
                    res.render('staff_loginD.hbs', { layout: 'staff_login', message: true})
                }else if (password != generalManager.Password){
                    res.render('staff_loginD.hbs', { layout: 'staff_login', message: true})
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
        /*const position = am.Position
        if (position == "Area"){
            const department = await Department.findById(am.DepartmentId).lean()
            const allDevicesArray = department.Devices
            var allDevicesList = new Array()
            for (let i = 0; i < allDevicesArray.length; i++){
                var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
                allDevicesList.push(onedeviceData)
            }
        }*/

        //find all the devices that are in this department
        const department = await Department.findById(am.DepartmentId).lean()
        const allDevicesArray = department.Devices
        var allDevicesList = new Array()
        var elecdailyU = [0,0,0,0,0,0,0]
        var coaldailyU = [0,0,0,0,0,0,0]
        var hydailyU = [0,0,0,0,0,0,0]
        var gasdailyU = [0,0,0,0,0,0,0]
        var otherdailyU = [0,0,0,0,0,0,0]
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
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
        console.log(elecPercent)

        res.render('managerD.hbs', {
            layout: 'manager',
            gm: amD,
            AllDeviceList: allDevicesList,
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
        departs = new Array()
        departs.push({DepartmentName: gm.Department})

        res.render('gm_accountD.hbs', { 
            layout: 'gm_account',
            gm: gmD,
            deList: departs
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

        const allDevicesArray = await Device.find({Department: gm.Department})
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
        const staff = await User.findById(req.params.staff_id).lean()
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
        const AvailabledevicesArray = staff.AvailableDevices
            var availableDevicesList = new Array()
            for (let i = 0; i < AvailabledevicesArray.length; i++){
                var onedeviceData = await Device.findById(AvailabledevicesArray[i]).lean()
                availableDevicesList.push(onedeviceData)
            }
        res.render('gm_staffdetailD.hbs', { 
            layout: 'gm_staffdetail',
            gm: gmD,
            staff: staff,
            availableDevices: availableDevicesList
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

const updatePersonalDetail = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm) {
            return res.sendStatus(404)
        }
        const firstN = req.body.firstName
        const lastN = req.body.lastName
        const contactN = req.body.Cnumber
        const gen = req.body.gender

        if(firstN || lastN || contactN || gen){
            gm.FirstName = firstN
            gm.LastName = lastN
            gm.ContactNumber = contactN
            gm.Gender = gen
            await Manager.replaceOne({_id: gm._id}, gm).catch((err) => res.send(err))

            return res.redirect('/manager/' + gm._id + '/profile')
        }else{
            return next()
        }
    }catch(err){
        return next(err)
    }
}

const changePassword = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm) {
            return res.sendStatus(404)
        }
        const newP = req.body.newPassword
        gm.Password = newP
        await Manager.replaceOne({_id: gm._id}, gm).catch((err) => res.send(err))
        return res.redirect('/manager/' + gm._id + '/profile')
    }catch(err){
        return next(err)
    }
}

const editStaff = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        let staff = await User.findById(req.params.staff_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const newDevice = req.body.newDeviceAdd.toLowerCase()
        const deletDevice = req.body.deleDe
        const deletStaff = req.body.deleteS
        if(deletDevice){
            const onedevice = await Device.findOne({Department: staff.Department, Device_name: deletDevice}).lean()
            //delete device in the user model
            const AvailabledevicesArray = staff.AvailableDevices
            var availableDevicesList = new Array()
            for (let i = 0; i < AvailabledevicesArray.length; i++){
                if(String(onedevice._id) != String(AvailabledevicesArray[i])){
                    availableDevicesList.push(AvailabledevicesArray[i])
                }
            }
            staff.AvailableDevices = availableDevicesList

            //update the device model
            const staffList = new Array()
            for (let i = 0; i < onedevice.Staff.length; i++){
                if(String(staff._id) != String(onedevice.Staff[i])){
                    staffList.push(onedevice.Staff[i])
                }
            }
            onedevice.Staff = staffList

            await Device.replaceOne({_id: onedevice._id}, onedevice).catch((err) => res.send(err))
            await User.replaceOne({_id: staff._id}, staff).catch((err) => res.send(err))
            return res.redirect('/manager/' + gm._id + '/' + staff._id + '/staffdetail')
        }else if(newDevice){
            const onedevice = await Device.findOne({Department: staff.Department, Device_name: newDevice}).lean()
            //update staff data
            let exist = true
            for (let i = 0; i < staff.AvailableDevices.length; i++){
                if(String(onedevice._id) == String(staff.AvailableDevices[i])){
                    exist=false
                    break
                }
            }
            if(exist){
                staff.AvailableDevices.push(onedevice._id)
                exist = true
            }
            //update device data
            onedevice.Staff.push(staff._id)
            await Device.replaceOne({_id: onedevice._id}, onedevice).catch((err) => res.send(err))
            await User.replaceOne({_id: staff._id}, staff).catch((err) => res.send(err))
            return res.redirect('/manager/' + gm._id + '/' + staff._id + '/staffdetail')
        }else if(deletStaff){
            await User.remove({_id: staff._id}).lean()
            return res.redirect('/manager/' + gm._id + '/staff')
        }else{
            return res.redirect('/manager/' + gm._id + '/' + staff._id + '/staffdetail')
        }
    }catch(err){
        return next(err)
    }
}

const deleteDevice = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        const deviceid = req.body.deletdevice
        if(!deviceid){
            return next();
        }else{
            const onedevice = await Device.findById(deviceid).lean()

            //delete the data of this device in the department
            const depart = await Department.findOne({DepartmentName: onedevice.Department}).lean()
            const AvailabledevicesArray = depart.Devices
            var availableDevicesList = new Array()
            for (let i = 0; i < AvailabledevicesArray.length; i++){
                if(String(onedevice._id) != String(AvailabledevicesArray[i])){
                    availableDevicesList.push(AvailabledevicesArray[i])
                }
            }
            depart.Devices = availableDevicesList
        
            //delete device in the array of energytype
            if(onedevice.Energy_type == "electricity"){
                const typearray = depart.Electricity
                var typeList = new Array()
                for (let i = 0; i < typearray.length; i++){
                    if(String(onedevice._id) != String(typearray[i])){
                        typeList.push(typearray[i])
                    }
                }
                depart.Electricity = typeList
            }
            //update the department data
            await Department.replaceOne({_id: depart._id}, depart).catch((err) => res.send(err))

            //delete the device in the user model
            const staffList = onedevice.Staff
            for(let i = 0; i < onedevice.Staff.length; i++){
                const onestaff = await User.findById(onedevice.Staff[i]).lean()
                var onestaffDeviceList = new Array()
                for(let j = 0; j < onestaff.AvailableDevices.length; j++){
                    if(String(onedevice._id) != String(onestaff.AvailableDevices[j])){
                        onestaffDeviceList.push(onestaff.AvailableDevices[j])
                    }
                }
                onestaff.AvailableDevices = onestaffDeviceList
                await User.replaceOne({_id: onestaff._id}, onestaff).catch((err) => res.send(err))
            }

            await Device.deleteOne({_id: deviceid}).lean()
            return res.redirect('/manager/' + gm._id + '/devices')
        }
    }catch(err){
        return next(err)
    }
}

const addnewDevice = async (req, res, next) => {
    try{
        const gm = await Manager.findById(req.params.manager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const dname = req.body.deviceName.toLowerCase()
        const type = req.body.typeBox
        const dDepart = req.body.departmentBox
        const image = req.files.imgfile.data
        const maxd = req.body.max
        const mind = req.body.min
        const oned = await Device.findOne({Device_name: dname, Department: dDepart}).lean()
        if(oned){
            console.log("device name is repeat")
            return res.redirect('/generalmanager/' + gm._id + '/devices')
        }
        var newimg = {
            name: dname,
            data: image,
            type: req.files.imgfile.mimetype,
            department: req.body.departmentBox
        }
        const oneImage = new ImageM(newimg)
        await ImageM.create(oneImage).catch((err) => res.send(err))

        //create new device
        const oneimg = await ImageM.findOne({name: dname, data: image, department: req.body.departmentBox}).lean()
        var device = {
            Device_name: dname,
            Energy_type: type,
            Department: dDepart,
            Month_Energy_Usage: 0,
            Week_Energy_Usage: 0,
            Weekly_usage: [0,0,0,0,0,0],
            Status: true,
            Daily_Energy_Usage: [0,0,0,0,0,0,0],
            staff: [],
            image: oneimg._id,
            Max: maxd,
            Min: mind,
        }
        const onedevice = new Device(device)
        await Device.create(onedevice).catch((err) => res.send(err))
        const newdevice = await Device.findOne({Device_name: dname, Department: dDepart}).lean()

        const depart = await Department.findOne({DepartmentName: dDepart}).lean()
        depart.Devices.push(newdevice._id)
        if(type == "electricity"){
            depart.Electricity.push(newdevice._id)
        }else if(type == "coal"){
            depart.Coal.push(newdevice._id)
        }else if(type == "gas"){
            depart.Natural_Gas.push(newdevice._id)
        }else if(type == "hydrogen"){
            depart.Hydrogen.push(newdevice._id)
        }else{
            depart.other.push(newdevice._id)
        }
        await Department.replaceOne({_id: depart._id}, depart).lean()
        return res.redirect('/manager/' + gm._id + '/devices')
    }catch(err){
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
    createAccount,
    updatePersonalDetail,
    changePassword,
    editStaff,
    deleteDevice,
    addnewDevice
}