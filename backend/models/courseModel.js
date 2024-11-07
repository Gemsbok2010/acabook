const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const courseSchema = new mongoose.Schema(
  {
    nanoId: {
      type: String,
    },
    teacherId: {
      type: String,
    },
    isTeacher: {
      type: Boolean,
    },
    email: {
      type: String,
    },
    category: {
      type: String,
    },
    subject: {
      type: String,
    },
    subject_en: {
      type: String,
    },
    description: {
      type: String,
    },
    zoom_rate: {
      type: String,
    },
    onsite_rate: {
      type: String,
    },
    trial_rate: {
      type: String,
      default: null,
    },
    zoom: {
      type: Boolean,
      default: true,
    },
    trial: {
      type: Boolean,
      default: false,
    },
    online: {
      type: String,
    },
    pauseSubject: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
courseSchema.plugin(mongoosePaginate);
const teacherModel = mongoose.model("courses", courseSchema);
module.exports = teacherModel;
