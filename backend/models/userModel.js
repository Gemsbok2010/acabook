const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    nanoId: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    teacherId: {
      type: String,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: true,
      min: 1,
      max: 35,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
      max: 35,
    },
    email: {
      type: String,
      index: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    gender: {
      type: String,
    },
    birth: {
      type: String,
    },
    survey: {
      type: String,
    },
    streetNo: {
      type: String,
    },
    street: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    suburb: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    filename: {
      type: String,
    },
    password: {
      type: String,
      min: 6,
      max: 255,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    googleId: {
      type: String,
    },
    photos: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
