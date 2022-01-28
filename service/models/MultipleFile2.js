const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    filename : {
        type : String,
        unique : true,
        required: true
    },
    
})

module.exports = UploadModel = mongoose.model('uploads', uploadSchema);