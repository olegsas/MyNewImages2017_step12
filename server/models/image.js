const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let imageSchema = mongoose.Schema({
     _owner: {type: String},
    url: String,
    public_id: String
});



let Image = mongoose.model('Image', imageSchema);
module.exports = Image;