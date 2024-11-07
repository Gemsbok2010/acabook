const express = require("express");
const router = express.Router();
require("dotenv/config");

// Imports
const Course = require("../models/courseModel");
const Teacher = require("../models/teacherModel");
const { courseValidationIntl } = require("../validation");

//============ CREATE NEW COURSE ==============
router.post("/createCourse", async (req, res, next) => {
  // Check profession if already exist in database
  const courseExist = await Course.findOne({
    nanoId: req.body.nanoId,
    category: req.body.category,
    subject: req.body.subject,
    subject_en: req.body.subject_en,
    online: req.body.online,
  });
  if (courseExist)
    return res.status(400).json({
      invalid: "Subject of this Category exists already.",
    });

  const { error } = courseValidationIntl(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  const course = new Course({
    category: req.body.category,
    subject: req.body.subject,
    subject_en: req.body.subject_en,
    description: req.body.description,
    trial_rate: req.body.trial_rate,
    zoom_rate: req.body.zoom_rate,
    onsite_rate: req.body.onsite_rate,
    zoom: req.body.zoom,
    trial: req.body.trial,
    online: req.body.online,
    // standard
    nanoId: req.body.nanoId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  try {
    const storedCourse = await course.save();
    res.send(storedCourse);
  } catch (err) {
    res.redirect(process.env.FRONTEND_URL + "/dashboard");
  }
});

//=========== GET SUBJECTS (From TeacherSubjects.js) ============
router.get("/search", async (req, res) => {
  Course.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = { nanoId: req.query.nanoId };

    const total = await Course.find(match).countDocuments();

    let perPage = 8;
    let maxPage = Math.ceil(total / perPage);
    const page =
      req.query.page && total > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");

    const display = await Course.find({
      nanoId: req.query.nanoId,
      pauseSubject: false,
    }).countDocuments();

    try {
      const courses = await Course.find(match)
        .sort({ category: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        courses: courses,
        total: total,
        page: page,
        maxPage: maxPage,
        sort: sort,
        display: display,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// Pause Subject by Tutor (from TeacherSubjects.js)
router.put("/sleepCourse/:id", async (req, res) => {
  const subject = await Course.findOne({ _id: req.params.id });

  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  const total = await Course.find({
    nanoId: subject.nanoId,
  }).countDocuments();

  let perPage = 8;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedCourse = await Course.updateOne(
      { _id: req.params.id },
      { pauseSubject: req.body.pauseSubject }
    );

    const display = await Course.find({
      nanoId: subject.nanoId,
      pauseSubject: false,
    }).countDocuments();

    let adPosts = await Course.find({
      nanoId: req.query.nanoId,
    })
      .sort({ category: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedCourse: storedCourse,
      adPosts: adPosts,
      total: total,
      sort: sort,
      maxPage: maxPage,
      page: page,
      display: display,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ======= DELETE SUBJECT (from TeacherSubjects.js) =========
router.delete("/deleteSubject/:id", async (req, res) => {
  const deleted = await Course.deleteOne({ _id: req.params.id });

  const display = await Course.find({
    _id: req.params.id,
  }).countDocuments();

  res.json({ deleted: deleted, display: display });
});

//======== EDIT SUBJECT (from TeacherSubjects.js) ==========
router.get("/edit/:id", async (req, res) => {
  const subject = await Course.findOne({ _id: req.params.id });

  res.redirect(process.env.FRONTEND_URL + "subjectEdit/" + req.params.id);
});

//==== EDIT SUBJECT DETAILS (from TeacherSubjectEdit.js) =====

router.get("/subjectEdit/:id", async (req, res) => {
  try {
    const this_subject = await Course.findOne({ _id: req.params.id });

    const teacher = await Teacher.findOne({ nanoId: this_subject.nanoId });

    res.status(200).json({
      this_subject: this_subject,
      teacher: teacher,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============= UPDATE IN SUBJECT EDIT ================
router.put("/edit", async (req, res, next) => {
  // const { error } = listingEditValidation(req.body);

  // if (error) return res.status(400).json({ invalid: error.details[0].message });

  Course.findByIdAndUpdate(req.body.id, req.body).then(function (
    storedSubject
  ) {
    res.send(storedSubject);
  });
});

//=========== GET SUBJECTS (From TeacherSubjects.js) ============
router.get("/resume", async (req, res) => {
  Course.paginate({}, {}).then(async (result) => {
    try {
      const courses = await Course.find({
        nanoId: req.query.nanoId,
        pauseSubject: false,
      }).sort({ category: -1 });

      res.status(200).json({
        courses: courses,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
