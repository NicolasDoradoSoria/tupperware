const mongoose = require('mongoose');

const mulitipleFileSchema = mongoose.Schema({
    files: [Object]
}, {timestamps: true});

module.exports = mongoose.model('MultipleFile', mulitipleFileSchema);