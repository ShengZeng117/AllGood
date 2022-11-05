const GeneralManager = require('../models/generalManager')
const Device = require('../models/Devices')
const Department = require('../models/Department')
const User = require('../models/User')
const Manager = require('../models/Manager')
var uuid = require('node-uuid');
var ImageM = require('../models/image');
var fs = require('fs');



const generalmanagerLogin = (req, res) => {
    res.render('manager_loginD.hbs', { layout: 'manager_login'})
}

const generalmanagerOverview = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }

        const gmD = {
            check: true,
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
        }

        const allDepartArray = await Department.find({})
        var DepartmentName = new Array()
        var elecUsage = new Array()
        var coalUsage = new Array()
        var hydrogenUsage = new Array()
        var gasUsage = new Array()
        var otherUsage =new Array()
        for (let i = 0; i < allDepartArray.length; i++){
            var onedepart = allDepartArray[i]
            DepartmentName.push(onedepart.DepartmentName)
            //electricity usage
            let oneElecUsage = 0
            for(let j = 0; j < onedepart.Electricity.length; j++){
                var onedevice = await Device.findById(onedepart.Electricity[j]._id).lean()
                oneElecUsage += onedevice.Week_Energy_Usage
            }
            elecUsage.push(oneElecUsage)
            //cocal usage
            let oneCoalUsage = 0
            for(let j = 0; j < onedepart.Cocal.length; j++){
                var onedevice = await Device.findById(onedepart.Cocal[j]).lean()
                oneCoalUsage += onedevice.Week_Energy_Usage
            }
            coalUsage.push(oneCoalUsage)
            //hydrogen usage
            let oneHydrogenU = 0
            for(let j = 0; j < onedepart.Hydrogen.length; j++){
                var onedevice = await Device.findById(onedepart.Hydrogen[j]).lean()
                oneHydrogenU += onedevice.Week_Energy_Usage
            }
            hydrogenUsage.push(oneHydrogenU)
            //natural gas usage
            let onegasUsage = 0
            for(let j = 0; j < onedepart.Natural_Gas.length; j++){
                var onedevice = await Device.findById(onedepart.Natural_Gas[j]).lean()
                onegasUsage += onedevice.Week_Energy_Usage
            }
            gasUsage.push(onegasUsage)
            //other usage
            let oneotherUsage = 0
            for(let j = 0; j < onedepart.other.length; j++){
                var onedevice = await Device.findById(onedepart.other[j]).lean()
                oneotherUsage += onedevice.Week_Energy_Usage
            }
            otherUsage.push(oneotherUsage)

            var departmentUsage = {
                electricity: elecUsage,
                coal: coalUsage,
                hydrogen: hydrogenUsage,
                gas: gasUsage,
                other: otherUsage,
            }
        }
        var elecPercent = caculateoercentage(elecUsage);
        var coalPercent = caculateoercentage(coalUsage);
        var hydrogenPercent = caculateoercentage(hydrogenUsage);
        var gasPercent = caculateoercentage(gasUsage);
        var otherPercent = caculateoercentage(otherUsage);
        var departmentUPercent = {
            electricity: elecPercent,
            coal: coalPercent,
            hydrogen: hydrogenPercent,
            gas: gasPercent,
            other: otherPercent,
        }

        res.render('generalManager_areaD.hbs', {
            layout: 'generalManager_area',
            gm: gmD,
            DepartName: DepartmentName,
            DepartU: departmentUsage,
            DepartP: departmentUPercent
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
    for(let i = 0; i < a.length; i++){
        b.push(a[i] /total)
    }
    return b
}

const getaccoutPage = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: true,
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
        }
        const deList = await Department.find({})
        var alldeList = new Array()
        for (let i = 0; i < deList.length; i++){
            var onede = await Department.findById(deList[i]._id).lean()
            alldeList.push(onede)
        }
        res.render('gm_accountD.hbs', { 
            layout: 'gm_account',
            gm: gmD,
            deList: alldeList
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
        const gmD = {
            check: true,
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
        }
        const allDevicesArray = await Device.find({})
        var allDevicesList = new Array()
        for (let i = 0; i < allDevicesArray.length; i++){
            var onedeviceData = await Device.findById(allDevicesArray[i]).lean()
            allDevicesList.push(onedeviceData)
        }

        const deList = await Department.find({})
        var alldeList = new Array()
        for (let i = 0; i < deList.length; i++){
            alldeList.push(deList[i].DepartmentName)
        }

        const checkmanager = {gm: true}
        res.render('gm_dataD.hbs', {
            layout: 'gm_data',
            gm: gmD,
            checkm: checkmanager,
            AllDeviceList: allDevicesList,
            alldeparList: alldeList,
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
        const gmD = {
            check: true,
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
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: true,
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
        }
        const staffList = await User.find({})
        var allStaffList = new Array()
        for (let i = 0; i < staffList.length; i++){
            var onestaff = await User.findById(staffList[i]._id).lean()
            allStaffList.push({
                check: true,
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
                check: true,
                gm_id: gm._id,
                staff_id: onemanager._id,
                FirstName: onemanager.FirstName,
                LastName: onemanager.LastName,
                Gender: onemanager.Gender,
                Position: onemanager.Position,
                Email: onemanager.Email,
                ContactNumber: onemanager.ContactNumber,
                StaffId: onemanager.Id,
                Age: onemanager.Age,
                Password: onemanager.Password,
                Department: onemanager.Department,
                DepartmentId: onemanager.DepartmentId
        })
        }

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
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: true,
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
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        let staff = await User.findById(req.params.staff_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        const gmD = {
            check: true,
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
        }
        if(!staff){
            manager = await Manager.findById(req.params.staff_id).lean()
            staff ={
                check: true,
                _id: manager._id,
                FirstName: manager.FirstName,
                LastName: manager.LastName,
                Gender: manager.Gender,
                Position: manager.Position,
                Email: manager.Email,
                ContactNumber: manager.ContactNumber,
                StaffId: manager.Id,
                Age: manager.Age,
                Password: manager.Password,
                Department: manager.Department,
                DepartmentId: manager.DepartmentId
        }
            var availableDevicesList = new Array()
        }else{
            const AvailabledevicesArray = staff.AvailableDevices
            var availableDevicesList = new Array()
            for (let i = 0; i < AvailabledevicesArray.length; i++){
                var onedeviceData = await Device.findById(AvailabledevicesArray[i]).lean()
                availableDevicesList.push(onedeviceData)
            }
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
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm) {
            return res.sendStatus(404)
        }
        var userid1 = uuid.v1();
        
        const Dep = await Department.findOne({DepartmentName: req.body.departmentBox}).lean()


        if(req.body.position == 'Staff'){
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
            const oneuser = new User(info)
            await User.create(oneuser).catch((err) => res.send(err))
            return res.redirect('/generalmanager/' + gm._id + '/createAccount')
        }else{
            const info = {
                FirstName: req.body.firstNa,
                LastName: req.body.lastNa,
                Gender: req.body.genderbox,
                Position: req.body.position,
                Email: req.body.email,
                EntryTime: new Date(),
                ContactNumber: req.body.contactNumber,
                Id: userid1,
                Age: 0,
                Password: '123456789',
                AvailiableDevices: [],
                Department: req.body.departmentBox,
                DepartmentId: Dep._id
            }
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

        if(firstN || lastN || contactN || gen){
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

const editdepartment = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        if (!gm) {
            return res.sendStatus(404)
        }
        const deletede = req.body.deleDe
        const newdeN = req.body.adddepart
        if(deletede){
            await Device.deleteOne({Department: deletede}).lean()
            await User.deleteOne({Department: deletede}).lean()
            await Manager.deleteOne({Department: deletede}).lean()
            await Department.deleteOne({DepartmentName: deletede}).lean()
        }else if(newdeN){
            const newde ={
                DepartmentName: newdeN,
                Devices: [],
                Cocal: [],
                Electricity: [],
                Natural_Gas: [],
                Hydrogen: [],
                other: []
            }
    
            const onedep = new Department(newde)
            await Department.create(onedep).catch((err) => res.send(err))
        }
        return res.redirect('/generalmanager/' + gm._id + '/department')
    }catch(err){
        return next(err)
    }
}

const editStaff = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        let staff = await User.findById(req.params.staff_id).lean()
        if (!gm){
            return res.sendStatus(404)
        }
        if(!staff){
            staff = await Manager.findById(req.params.staff_id).lean()
            if(req.body.deleteS){
                await Manager.remove({_id: staff._id}).lean()
                return res.redirect('/generalmanager/' + gm._id + '/staff')
            }
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
            return res.redirect('/generalmanager/' + gm._id + '/' + staff._id + '/staffdetail')
        }else if(newDevice){
            const onedevice = await Device.findOne({Department: staff.Department, Device_name: newDevice}).lean()
            let exist = true
            //update staff data
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
            return res.redirect('/generalmanager/' + gm._id + '/' + staff._id + '/staffdetail')
        }else if(deletStaff){
            await User.remove({_id: staff._id}).lean()
            return res.redirect('/generalmanager/' + gm._id + '/staff')
        }else{
            return res.redirect('/generalmanager/' + gm._id + '/' + staff._id + '/staffdetail')
        }
    }catch(err){
        return next(err)
    }
}

const deleteDevice = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
        const deviceid = req.body.deletdevice
        if(!deviceid){
            return next();
        }else{
            const onedevice = await Device.findById(deviceid).lean()
            await ImageM.deleteOne({_id: onedevice.image})

            //delete the data of this device in the department
            const depart = await Department.findOne({ DepartmentName: onedevice.Department}).lean()
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
            }else if(onedevice.Energy_type == "coal"){
                const typearray = depart.Cocal
                var typeList = new Array()
                for (let i = 0; i < typearray.length; i++){
                    if(String(onedevice._id) != String(typearray[i])){
                        typeList.push(typearray[i])
                    }
                }
                depart.Cocal = typeList
            }else if(onedevice.Energy_type == "gas"){
                const typearray = depart.Natural_Gas
                var typeList = new Array()
                for (let i = 0; i < typearray.length; i++){
                    if(String(onedevice._id) != String(typearray[i])){
                        typeList.push(typearray[i])
                    }
                }
                depart.Natural_Gas = typeList

            }else if(onedevice.Energy_type == "hydrogen"){

                const typearray = depart.Hydrogen
                var typeList = new Array()
                for (let i = 0; i < typearray.length; i++){
                    if(String(onedevice._id) != String(typearray[i])){
                        typeList.push(typearray[i])
                    }
                }
                depart.Hydrogen = typeList

            }else if(onedevice.Energy_type == "other"){
                const typearray = depart.other
                var typeList = new Array()
                for (let i = 0; i < typearray.length; i++){
                    if(String(onedevice._id) != String(typearray[i])){
                        typeList.push(typearray[i])
                    }
                }
                depart.other = typeList

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
            return res.redirect('/generalmanager/' + gm._id + '/devices')
        }
    }catch(err){
        return next(err)
    }
}

const addnewDevice = async (req, res, next) => {
    try{
        const gm = await GeneralManager.findById(req.params.generalManager_id).lean()
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
        return res.redirect('/generalmanager/' + gm._id + '/devices')
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
    changePassword,
    editdepartment,
    editStaff,
    addnewDevice,
    deleteDevice,
}