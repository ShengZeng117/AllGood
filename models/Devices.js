const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Device_name: { type: String, required: true },
    Energy_type: { type: String, required: true },
    Month_Energy_Usage: Number,
    Week_Energy_Usage: Number,
    Weekly_usage: [Number],
    Status: Boolean,
    Department:{ type: String, required: true },
    Location: { type: String},
    Daily_Energy_Usage: [Number],
    Staff: [mongoose.Schema.Types.ObjectId],
    image: mongoose.Schema.Types.ObjectId,
    Max: Number,
    Min: Number,

}, {versionKey: false})
const Devices = mongoose.model('Devices', schema)
module.exports = Devices