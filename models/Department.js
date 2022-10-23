const mongoose = require('mongoose')
const Device = require('./Devices')

const schema = new mongoose.Schema({
    DepartmentName: { type: String },
    Devices: [Device.schema],
    Cocal: [Device.schema],
    Electricity: [Device.schema],
    Natural_Gas: [Device.schema],
    Hydrogen: [Device.schema],
    other: [Device.schema]

}, {versionKey: false})
const Department = mongoose.model('Department', schema)
module.exports = Department