const mongoose = require('mongoose')
const Device = require('./Devices')

const schema = new mongoose.Schema({
    DepartmentName: { type: String, required: true },
    Devices: [Device.schema],
    Cocal: [Device.schema],
    Electricity: [Device.schema],
    Natural_Gas: [Device.schema],
    Hydrogen: [Device.schema],
    other: [Device.schema]

})
const Department = mongoose.model('Department', schema)
module.exports = Department