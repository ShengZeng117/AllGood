const mongoose = require('mongoose')
const Device = require('./Devices')

const schema = new mongoose.Schema({
    DepartmentName: { type: String },
    Devices: [mongoose.Schema.Types.ObjectId],
    Cocal: [{type: mongoose.Schema.Types.ObjectId, ref: 'Devices'}],
    Electricity: [{type: mongoose.Schema.Types.ObjectId, ref: 'Devices'}],
    Natural_Gas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Devices'}],
    Hydrogen: [{type: mongoose.Schema.Types.ObjectId, ref: 'Devices'}],
    other: [{type: mongoose.Schema.Types.ObjectId, ref: 'Devices'}]

}, {versionKey: false})
const Department = mongoose.model('Department', schema)
module.exports = Department