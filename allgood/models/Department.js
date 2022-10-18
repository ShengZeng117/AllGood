const mongoose = require('mongoose')
const Device = require('./Devices')

const schema = new mongoose.Schema({
    DepartmentName: { type: String, required: true },
    Devices: [Device.schema]

})
const Department = mongoose.model('Department', schema)
module.exports = Department