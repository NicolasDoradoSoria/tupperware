const mongoose = require("mongoose");

const filesSchema = mongoose.Schema({
    photoURL: {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model("Files", filesSchema);