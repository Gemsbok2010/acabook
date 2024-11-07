const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const applicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    nanoId: {
      type: String,
    },
    teacherId: {
      type: String,
    },
    yourpay: {
      type: String,
    },
    hometutor: {
      type: String,
    },
    onlinetutor: {
      type: String,
    },
    slugId: {
      type: String,
    },
    nanoslug: {
      type: String,
    },
    caseId: {
      type: String,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    startDate: {
      type: String,
    },
    finishDate: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    streetNo: {
      type: String,
    },
    street: {
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
    seen: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

applicationSchema.plugin(mongoosePaginate);

const applicationModel = mongoose.model("applications", applicationSchema);
module.exports = applicationModel;
