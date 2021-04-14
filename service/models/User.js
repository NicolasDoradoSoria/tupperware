const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    register: {
      type: Date,
      default: Date.now(),
    },
    admin: {
      type: Boolean,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    order: [

      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      }
    ]
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Usuario", userSchema);
