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
    dni: {
      type: String,
      required: true,
    },
    cp: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    alternativePhone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
    dateOfBirth: {
      type: Date,
      require
    },
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
