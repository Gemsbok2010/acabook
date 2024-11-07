const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const teacherSchema = new mongoose.Schema(
  {
    nanoId: {
      type: String,
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
      min: 2,
      max: 255,
    },
    lastName: {
      type: String,
      min: 2,
      max: 255,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    nationality: {
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
    postalCode: {
      type: String,
    },
    suburb: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    languages: {
      type: String,
    },
    whichlanguage0: {
      type: String,
    },
    whichlanguage1: {
      type: String,
    },
    whichlanguage2: {
      type: String,
    },
    whichlanguage0_en: {
      type: String,
    },
    whichlanguage1_en: {
      type: String,
    },
    whichlanguage2_en: {
      type: String,
    },
    languageLvl0: {
      type: String,
    },
    languageLvl1: {
      type: String,
    },
    languageLvl2: {
      type: String,
    },
    resume: {
      type: String,
    },
    education: {
      type: String,
    },
    degree1: {
      type: String,
    },
    degree2: {
      type: String,
    },
    degree3: {
      type: String,
    },
    university1: {
      type: String,
    },
    university2: {
      type: String,
    },
    university3: {
      type: String,
    },
    finish1: {
      type: String,
    },
    finish2: {
      type: String,
    },
    finish3: {
      type: String,
    },
    start1: {
      type: String,
    },
    start2: {
      type: String,
    },
    start3: {
      type: String,
    },
    workhistory: {
      type: String,
    },
    honourTitle: {
      type: String,
    },
    honourAwards: {
      type: String,
    },
    SMStext: {
      type: Boolean,
      default: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Array,
      default: [],
    },
    activeButton: {
      type: Number,
    },
    filename: {
      type: String,
    },
    showTeacher: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
teacherSchema.plugin(mongoosePaginate);
const teacherModel = mongoose.model("teachers", teacherSchema);
module.exports = teacherModel;
