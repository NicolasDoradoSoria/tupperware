const mongoose = require('mongoose')

exports.ROLES = ["user", "admin", "moderator"]
const roleSchema = mongoose.Schema({
    name: String
},{
    versionKey: false
})

module.exports = mongoose.model('Role',roleSchema )