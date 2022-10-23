const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Id: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Age: Number,
    Gender: String,
    ContactNumber: { type: String, required: true },
    Position: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    EntryTime: { type: Date, required: true},
    Password: { type: String, required: true },

}, {versionKey: false})

const GeneralManager = mongoose.model('GeneralManager', schema)
module.exports = GeneralManager