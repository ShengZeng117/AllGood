const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Device_name: { type: String, required: true },
    Energy_type: { type: String, required: true },
    Month_Energy_Usage: Number,
    Week_Energy_Usage: Number,
    Status: Boolean,
    Department:{ type: String, required: true },
    Location: { type: String, required: true },
    Daily_Energy_Usage: [Number]

}, {versionKey: false})
const Devices = mongoose.model('Devices', schema)
module.exports = Devices