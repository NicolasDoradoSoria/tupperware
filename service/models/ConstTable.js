const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constTable = mongoose.Schema({
  allColss: [{
    id: {
      type: Number,
    },
    title: {
      type: String,
    }
  }],
});

module.exports = mongoose.model("constTable", constTable);
