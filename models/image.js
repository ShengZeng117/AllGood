var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
}, {versionKey: false});

module.exports = new mongoose.model('Image', imageSchema);