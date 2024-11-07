const mongoose = require("mongoose");
const slugify = require("slugify");
const mongoosePaginate = require("mongoose-paginate-v2");
const moment = require("moment");

const jobSchema = new mongoose.Schema(
  {
    isTeacherJob: {
      type: Boolean,
      default: false,
    },
    isDeletedJob: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
    },
    caseId: {
      type: String,
    },
    todaysDate: {
      type: String,
    },
    monday: {
      type: Boolean,
    },
    tuesday: {
      type: Boolean,
    },
    wednesday: {
      type: Boolean,
    },
    thursday: {
      type: Boolean,
    },
    friday: {
      type: Boolean,
    },
    saturday: {
      type: Boolean,
    },
    sunday: {
      type: Boolean,
    },
    monStart: {
      type: String,
    },
    monFinish: {
      type: String,
    },
    tueStart: {
      type: String,
    },
    tueFinish: {
      type: String,
    },
    wedStart: {
      type: String,
    },
    wedFinish: {
      type: String,
    },
    thuStart: {
      type: String,
    },
    thuFinish: {
      type: String,
    },
    friStart: {
      type: String,
    },
    friFinish: {
      type: String,
    },
    satStart: {
      type: String,
    },
    satFinish: {
      type: String,
    },
    sunStart: {
      type: String,
    },
    sunFinish: {
      type: String,
    },
    contractType: {
      type: String,
    },
    level: {
      type: String,
    },
    subjects: {
      type: String,
    },
    subjects_en: {
      type: String,
    },
    frequency: {
      type: String,
    },
    duration: {
      type: String,
    },
    normal_rate: {
      type: String,
    },
    home_rate: {
      type: String,
    },
    zoom_rate: {
      type: String,
    },
    transport: {
      type: Boolean,
    },
    foreigner: {
      type: Boolean,
    },
    home_tutoring: {
      type: Boolean,
    },
    startDate: {
      type: String,
    },
    finishDate: {
      type: String,
    },
    about: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
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
    filename: {
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
    slug: {
      type: String,
      required: true,
      unique: false,
    },
    date: {
      type: String,
      default: moment().format("DD MMM YYYY"),
    },
  },
  { timestamps: true }
);

jobSchema.pre("validate", function (next) {
  if (this.id) {
    this.slug = slugify(this.id, { lower: true, strict: true });
  }
  next();
});

jobSchema.plugin(mongoosePaginate);

const listingModel = mongoose.model("listings", jobSchema);
module.exports = listingModel;
