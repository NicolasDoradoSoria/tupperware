import {Schema, model} from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  }
}, {
  versionKey: false
});

module.exports = model("Category", CategorySchema);