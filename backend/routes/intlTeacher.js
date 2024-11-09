const express = require("express");
const router = express.Router();
const nanoid = require("nanoid").nanoid;
const generate = require("nanoid-generate");
const teacherId = generate.numbers(7);
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
require("dotenv/config");

// Imports
const Teacher = require("../models/teacherModel");
const User = require("../models/userModel");
const Pub = require("../models/applicationModel");
const Listing = require("../models/listingModel");
const Subject = require("../models/subjectModel");
const Course = require("../models/courseModel");
const { uploadFile } = require("../../s3");
const {
  step1International,
  teacherInternational,
  smInternational,
} = require("../validation");

//==================== STEP 1 =================
router.post("/step1", async (req, res, next) => {
  try {
    const { error } = step1International(req.body);
    if (error)
      return res.status(400).json({ invalid: error.details[0].message });
    res.send(req.body);
  } catch (err) {
    res.status(400).json({ err });
  }
});

//==================== STEP 3 =================
router.put("/step4", async (req, res, next) => {
  try {
    // Check email if already exist in database
    const emailExist = await Teacher.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).json({
        prompt:
          "You have registered already. If you believe there is an error, please contact Acabook Customer Serivce.",
      });

    const streetNo = req.body.streetNo;

    const myArray = streetNo.split("");

    const last = myArray.at(-1);
    if (last === "號") {
      req.body.streetNo;
    } else {
      req.body.streetNo = req.body.streetNo + "號";
    }
    const teacher = new Teacher({
      teacherId: "L" + teacherId,
      nanoId: req.body.nanoId,
      isTeacher: req.body.isTeacher,
      email: req.body.email,
      gender: req.body.gender,
      nationalId: req.body.nationalId,
      phone: req.body.phone,
      nationality: req.body.nationality,
      streetNo: req.body.streetNo,
      street: req.body.street,
      suburb: req.body.suburb,
      city: req.body.city,
      postalCode: req.body.postalCode,
      state: req.body.state,
      country: req.body.country,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      workhistory: req.body.workhistory,
      resume: req.body.resume,
      honourTitle: req.body.honourTitle,
      honourAwards: req.body.honourAwards,
      skillOne: req.body.skillOne,
      skillOne1: req.body.skillOne1,
      skillOne2: req.body.skillOne2,
      skillOne3: req.body.skillOne3,
      skillSchool1: req.body.skillSchool1,
      skillSchool2: req.body.skillSchool2,
      skillSchool3: req.body.skillSchool3,
      skillTwo: req.body.skillTwo,
      skillTwo1: req.body.skillTwo1,
      skillTwo2: req.body.skillTwo2,
      skillTwo3: req.body.skillTwo3,
      skillComp1: req.body.skillComp1,
      skillComp2: req.body.skillComp2,
      skillComp3: req.body.skillComp3,
      skillThree: req.body.skillThree,
      skillThree1: req.body.skillThree1,
      skillThree2: req.body.skillThree2,
      skillThree3: req.body.skillThree3,
      skillSport1: req.body.skillSport1,
      skillSport2: req.body.skillSport2,
      skillSport3: req.body.skillSport3,
      education: req.body.education,
      degree1: req.body.degree1,
      university1: req.body.university1,
      start1: req.body.start1,
      finish1: req.body.finish1,
      degree2: req.body.degree2,
      university2: req.body.university2,
      start2: req.body.start2,
      finish2: req.body.finish2,
      degree3: req.body.degree3,
      university3: req.body.university3,
      start3: req.body.start3,
      finish3: req.body.finish3,
      languages: req.body.languages,
      whichlanguage0: req.body.whichlanguage0,
      whichlanguage1: req.body.whichlanguage1,
      whichlanguage2: req.body.whichlanguage2,
      whichlanguage0_en: req.body.whichlanguage0_en,
      whichlanguage1_en: req.body.whichlanguage1_en,
      whichlanguage2_en: req.body.whichlanguage2_en,
      languageLvl0: req.body.languageLvl0,
      languageLvl1: req.body.languageLvl1,
      languageLvl2: req.body.languageLvl2,
      activeButton: req.body.activeButton,
      row: req.body.row,
    });

    //add in users database
    User.findByIdAndUpdate(req.body._id, req.body).then(function () {
      User.updateOne({ isTeacher: req.body.isTeacher });
    });
    const storedTeacher = await teacher.save();
    res.send(storedTeacher);
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ GET TEACHER PROFILE ==============
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await Teacher.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET TEACHER PROFILE ==============
//from dashboard
router.get("/dashboard/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    const { error } = await smInternational({
      firstName: user.firstName,
      email: req.params.email,
    });

    const total = await Teacher.find({ showTeacher: true }).countDocuments();

    const teacher = await Teacher.findOne({ email: req.params.email });

    const num = await Listing.find({
      isTeacherJob: true,
      isDeletedJob: false,
    }).countDocuments();

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

    res.status(200).json({
      user: user,
      teacher: teacher,
      total: total,
      num: num,
      mylistings: mylistings,
      applicants: applicants,
      newApply: newApply,
      error: error,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET TEACHER PROFILE ==============
router.get("/candidate/:nanoId", async (req, res) => {
  try {
    const user = await Teacher.findOne({ nanoId: req.params.nanoId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============== PREVIEW CV (from Resume.js) ===============
router.get("/resume/:nanoId", async (req, res) => {

  const teacher = await Teacher.findOne({ nanoId: req.params.nanoId });

  if (teacher === null) {
    res.redirect(process.env.FRONTEND_URL + "/en");
  } else {
    res.redirect(process.env.FRONTEND_URL + "resume_en/" + req.params.nanoId);
  }
});

//================ VIEW 履歷 ======================
// (from listingmanager.js )
router.get("/resumeCandidate/:nanoId/:slug", async (req, res) => {
  const teacher = await Teacher.findOne({ nanoId: req.params.nanoId });
  let set = {};
  set["seen"] = true;
  const nanoslug = req.params.nanoId + req.params.slug;

  await Pub.updateOne({ nanoslug: nanoslug }, { $set: set });

  if (teacher === null) {
    res.redirect("/en");
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "resumeCandidate_en/" + req.params.nanoId
    );
  }
});

// ===== UPDATE TEACHER EXPERIENCES (from TeacherCV.js) =====
router.put("/updateCv", async (req, res, next) => {
  Teacher.findByIdAndUpdate(req.body._id, req.body).then(function () {
    Teacher.findById({ _id: req.body._id }).then(function (storedUser) {
      storedUser.save();
      res.send(storedUser);
    });
  });
});

// update teacher Profile (from teacher_profile.ejs)
router.put("/updateProfile", async (req, res, next) => {
  const { error } = teacherInternational(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  Teacher.findByIdAndUpdate(req.body._id, req.body).then(function () {
    Teacher.findById({ _id: req.body._id }).then(function (storedUser) {
      storedUser.save();
      res.send(storedUser);
    });
  });
});

// ================ HIDE ME AS TEACHER ============
router.put("/hideme/:id", async (req, res) => {
  // const teacher = await Teacher.findOne({ teacherId: req.params.id });

  // try {
  //   // New data (from req.body) to database
  //   Teacher.findByIdAndUpdate(teacher._id, req.body).then(function () {
  //     Teacher.findOne(teacher._id).then(function (storedUser) {

  //       console.log(storedUser.showTeacher, "new");
  //       res.send(storedUser);
  //     });
  //   });
  // } catch (err) {
  //   res.status(400).json({ err });
  // }

  try {
    const storedUser = await Teacher.updateOne(
      { teacherId: req.params.id },
      { showTeacher: req.body.showTeacher }
    );

    let num = await Teacher.find({ showTeacher: true }).countDocuments();

    res.send({ storedUser: storedUser, num: num });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ UPLOAD IMAGES ==============

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "./frontend/public/teacherPhoto/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  //allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/upload", async (req, res) => {
  upload(req, res, async (err) => {
    const email = req.query.email;
    const user = await Teacher.findOne({ email });

    if (req.file === undefined) {
      res.json({
        invalid:
          "Error: Attached file exceeded size limit or file not accepted.",
      });
    } else {
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);

      let set = {};
      set["photo"] = req.file.filename;

      await Pub.updateMany({ email: req.query.email }, { $set: set });

      Teacher.findByIdAndUpdate(user._id, {
        filename: result.Location,
      }).then(function () {
        Teacher.findOne({ email: req.query.email }).then(function (storedUser) {
          storedUser.save(() => {
            res.json({ storedUser: storedUser, newImage: result.Location });
          });
        });
      });
    }
  });
});

router.post("/adminUpload", async (req, res) => {
  upload(req, res, async (err) => {
    const email = req.query.email;

    let set = {};
    set["photo"] = req.file.filename;

    await Pub.updateMany({ email: req.query.email }, { $set: set });

    const teacher = await Teacher.findOne({ email });

    if (req.file === undefined) {
      res.redirect(
        process.env.FRONTEND_URL + "adminteacher/" + teacher.teacherId
      );
    } else {
      const result = await uploadFile(req.file);
      Teacher.findByIdAndUpdate(teacher._id, {
        filename: req.file.filename,
      }).then(function () {
        Teacher.findOne({ email: req.query.email }).then(function (storedUser) {
          storedUser.save(() => {
            res.redirect(
              process.env.FRONTEND_URL + "adminteacher/" + teacher.teacherId
            );
          });
        });
      });
    }
  });
});

//============ DELETE PHOTO ==============
router.delete("/allusers/:nanoId", async (req, res, next) => {
  let unset = {};
  unset["filename"] = null;

  const deleted = await Teacher.updateOne(
    { nanoId: req.params.nanoId },
    { $unset: unset }
  );
  res.status(204).json(deleted);
});

//============ GET TEACHER FILTERS ==============
router.get("/database", async (req, res) => {
  Teacher.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = { isTeacher: true, showTeacher: true };

    // Language Type
    if (req.query.language !== "") {
      const breakLanguage = req.query.language;
      const languageArr = breakLanguage.split(",");

      if (languageArr) {
        language1 = languageArr;
        language2 = languageArr;
        language3 = languageArr;
        const taal1 = { whichlanguage0: language1 };
        const taal2 = { whichlanguage1: language2 };
        const taal3 = { whichlanguage2: language3 };
        let tl = [taal1, taal2, taal3];
        match["$or"] = tl;
      }
    }

    // Subjects
    if (req.query.subjects !== "") {
      const breakSubjects = req.query.subjects;
      const subjectArr = breakSubjects.split(",");

      if (subjectArr) {
        subjects2 = subjectArr;
        subjects3 = subjectArr;
        subjects1 = subjectArr;
        const sub3 = { skillOne3: subjects3 };
        const sub2 = { skillOne2: subjects2 };
        const sub1 = { skillOne1: subjects1 };
        let od = [sub1, sub2, sub3];
        match["$or"] = od;
      }
    }

    // Location (STATE & COUNTRY)
    if (req.query.location !== "" || req.query.country !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");

      const breakCountry = req.query.country;
      const countryArr = breakCountry.split(",");
      let country = [];
      let location = [];
      if (stateArr || countryArr) {
        location = stateArr;
        country = countryArr;
        const ans1 = { country: "Australia" };
        const ans2 = { state: stateArr };
        od = [ans1, ans2];
        match["$or"] = od;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location !== "" && req.query.country === "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }
    // Location (COUNTRY ONLY)
    if (req.query.location === "" && req.query.country !== "") {
      match["country"] = "Australia";
    }

    console.log(match, "match");
    const num = await Teacher.find(match).countDocuments();
    const subjects = await Subject.find({ showSubject: true });

    let perPage = 12;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const teachers = await Teacher.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        teachers: teachers,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
        subjects: subjects,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//============ GET SUBJECTS IN TEACHER CV ==============
router.get("/listOfSubjects", async (req, res) => {
  try {
    const music = await Subject.find({
      showSubject: true,
      contractType: "樂器",
    }).sort({ subjectName: "asc" });

    const language = await Subject.find({
      showSubject: true,
      contractType: "語言",
    }).sort({ subjectName: "asc" });

    const university = await Subject.find({
      showSubject: true,
      contractType: "大學",
    }).sort({ subjectName: "asc" });

    const school = await Subject.find({
      showSubject: true,
      contractType: "學校",
    }).sort({ subjectName: "asc" });

    const standard = await Subject.find({
      showSubject: true,
      contractType: "一般課程",
    }).sort({ subjectName: "asc" });

    res.status(200).json({
      music: music,
      language: language,
      university: university,
      school: school,
      standard: standard,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//=========== GET SUBJECTS (From TeacherDB.js) ============
router.get("/listOfCourses", async (req, res) => {
  try {
    const courses = await Course.find({
      pauseSubject: false,
    }).sort({ category: -1 });

    res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
