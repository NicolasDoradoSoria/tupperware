import { Schema, model } from 'mongoose'
const userSchema = Schema(
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
    confirmPassword: {
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
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      }
    ],

    dateOfBirth: {
      type: Date,
      require
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
      }
    ]

  },
  {
    timestamps: true,
    versionKey: false
  }
);
export default model("Usuario", userSchema);
