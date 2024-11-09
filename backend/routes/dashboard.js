const express = require("express");
const router = express.Router();

// Imports
const User = require("../models/userModel");
const Pub = require("../models/applicationModel");
const Listing = require("../models/listingModel");
const Teacher = require("../models/teacherModel");

const { smValidation } = require("../validation");

//=========== GET TEACHER PROFILE (from Dashboard.js) ===========
router.get("/dashboard/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    const { error } = await smValidation({
      firstName: user.firstName,
      email: req.params.email,
    });
    const total = await Teacher.find({ showTeacher: true }).countDocuments();

    const teacher = await Teacher.findOne({ email: req.params.email });

    const mylistings = await Listing.find({
      email: req.params.email,
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const candidat = await Listing.find({
      email: req.params.email,
      isTeacherJob: true,
      isDeletedJob: false,
    });

    let slugArr = [];
    for (var i = 0; i < candidat.length; i++) {
      var results = candidat[i].slug;
      slugArr.push(results);
    }

    const applicants = await Pub.find({
      slugId: slugArr,
    }).countDocuments();

    const newApply = await Pub.find({
      seen: false,
      slugId: slugArr,
    }).countDocuments();

    const who = await User.find({ email: req.params.email });

    let state;
    if (who.length !== 0) {
      state = who[0].state;
    } else {
      state = "台北市";
    }

    const nationwide = await Listing.find({
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const tpe = await Listing.find({
      state: "台北市",
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const ntpe = await Listing.find({
      state: "新北市",
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const tao = await Listing.find({
      state: "桃園市",
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const tch = await Listing.find({
      state: "台中市",
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const khh = await Listing.find({
      state: "高雄市",
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const applied = await Pub.find({
      email: req.params.email,
    }).countDocuments();

    const seen = await Pub.find({
      seen: true,
      email: req.params.email,
    }).countDocuments();


    res.status(200).json({
      user: user,
      teacher: teacher,
      total: total,
      mylistings: mylistings,
      applicants: applicants,
      newApply: newApply,
      error: error,
      applied: applied,
      seen: seen,
      nationwide: nationwide,
      tpe: tpe,
      ntpe: ntpe,
      tch: tch,
      tao: tao,
      khh: khh,
      state: state,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============= HIDE ME AS TUTOR (From dashboard.js) ===========
router.put("/hideme/:id", async (req, res) => {
  const teacher = await Teacher.findOne({ teacherId: req.params.id });

  try {
    // New data (from req.body) to database
    Teacher.findByIdAndUpdate(teacher._id, req.body).then(function () {
      Teacher.findOne(teacher._id).then(function (storedUser) {
        Teacher.find({ showTeacher: true })
          .countDocuments()
          .then(function (num) {
            res.send({ storedUser: storedUser, num: num });
          });
      });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
