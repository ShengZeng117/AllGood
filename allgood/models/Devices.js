const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Device_name: { type: String, required: true },
    Energy_type: { type: String, required: true },
    TotalEnergyUsage: Number,
    Month_Energy_Usage: Number,
    Week_Energy_Usage: Number,
    Status: Boolean,
    Department:{ type: String, required: true },
    Location: { type: String, required: true }

})
const Devices = mongoose.model('Devices', schema)
module.exports = Devices