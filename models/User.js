const mongoose = require('mongoose')
const Device = require('./Devices')
const Department = require('./Department')

const schema = new mongoose.Schema({
    StaffId: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Age: Number,
    Gender: String,
    ContactNumber: { type: String, required: true },
    Position: { type: String, required: true },
    Department: {type: String, required: true },
    DepartmentId: {type: Department.schema},
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Permission: { type: String, required: true },
    AvailableDevices: [Device.schema]

},{versionKey: false})
const User = mongoose.model('User', schema)
module.exports = User