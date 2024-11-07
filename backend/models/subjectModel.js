const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
    },
    subjectName_en: {
      type: String,
    },
    contractType: {
      type: String,
    },
    showSubject: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
subjectSchema.plugin(mongoosePaginate);
const subjectModel = mongoose.model("subjects", subjectSchema);
module.exports = subjectModel;
