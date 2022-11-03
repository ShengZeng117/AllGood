const mongoose = require('mongoose')
const Department = require('./Department')
const ObjectId = require('mongoose').ObjectId

const schema = new mongoose.Schema({
    Id: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Age: Number,
    Gender: String,
    EntryTime:{type: Date},
    ContactNumber: { type: String, required: true },
    Position: { type: String, required: true },
    Department: {type: String, required: true },
    DepartmentId: {type: mongoose.Types.ObjectId},
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },

}, {versionKey: false})
const Manager = mongoose.model('Manager', schema)
module.exports = Manager