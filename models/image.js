var mongoose = require('mongoose');
  
var schema = new mongoose.Schema({
    name: String,
    data: Buffer,
    type: {type: String, required: true},
    department: String,
}, {versionKey: false});

const Image = mongoose.model('Image', schema)
module.exports = Image