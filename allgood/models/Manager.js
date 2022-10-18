const mongoose = require('mongoose')
const Device = require('./Devices')

const schema = new mongoose.Schema({
    StaffId: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Age: Number,
    Gender: String,
    Position: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Permission: { type: String, required: true },
    AvailableDevices: [Device.schema]

})
const Manager = mongoose.model('Manager', schema)
module.exports = Manager