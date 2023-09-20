const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var ImageSchema = new mongoose.Schema({
    image:{
        data:Buffer,
        contentType: String
    },
},{ timestamps: {} });

//Export the model
module.exports = mongoose.model('Image', ImageSchema);