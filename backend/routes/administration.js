const express = require("express");
const router = express.Router();
const mongoosePaginate = require("mongoose-paginate-v2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { config } = require("../config");
const moment = require("moment");
const { generateToken } = require("../util");
require("dotenv/config");

// Imports
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const Teacher = require("../models/teacherModel");
const Subject = require("../models/subjectModel");
const Pub = require("../models/applicationModel");
const Homepage = require("../models/homepageModel");

const {
  adminValidation,
  passwordChangeConfirmation,
} = require("../validation");

const {
  forgotPasswordEmail,
  sendforgotPasswordEmail,
} = require("../emails/sendEmail");

//=================== EMAIL LOGIN ================
router.post("/login", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE

  const { error } = await adminValidation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  // Check email if already exist in database
  const { email, password } = req.body;

  const admin = await User.findOne({ email: email, isAdmin: true });

  if (!admin) {
    return res.status(400).send("您並非管理員.");
  }

  // Password is correct?
  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass)
    return res.status(400).send("Email 或密碼不正確. 請確認再輸入.");

  if (!admin) {
    const errorMessage = "Email 或密碼不正確. 請確認再輸入.";
    res.status.send(errorMessage);
  } else {
    const token = generateToken(admin);
    res.cookie("adminToken", token, { httpOnly: false });
    res.json({ admin, token });
  }
});

//============ GET ALLUSERS PAGE ==============
router.get("/allusers", async (req, res) => {
  User.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = req.query.finishDate;

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    const total = await User.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(total / perPage);
    const page =
      req.query.page && total > perPage ? parseInt(req.query.page) : 1;
    console.log(match, "match");
    try {
      const users = await User.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        users: users,
        total: total,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//============ GET ALL TEACHERS PAGE ==============
router.get("/allteachers", async (req, res) => {
  Teacher.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = req.query.finishDate;

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    const total = await Teacher.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(total / perPage);
    const page =
      req.query.page && total > perPage ? parseInt(req.query.page) : 1;
    console.log(match, "match");
    try {
      const teachers = await Teacher.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        teachers: teachers,
        total: total,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
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

  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  let num = await Teacher.find({ showTeacher: true }).countDocuments();

  let total = await Teacher.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await Teacher.updateOne(
      { teacherId: req.params.id },
      { showTeacher: req.body.showTeacher }
    );

    const allTeachers = await Teacher.find()
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedUser: storedUser,
      num: num,
      total: total,
      allTeachers: allTeachers,
      page: page,
      maxPage: maxPage,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ================ MAKE USER AN ADMIN ============
router.put("/makeAdmin/:id", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  let num = await User.find({ isAdmin: true }).countDocuments();

  let total = await User.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await User.updateOne(
      { _id: req.params.id },
      { isAdmin: req.body.isAdmin }
    );

    const allUsers = await User.find()
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedUser: storedUser,
      num: num,
      total: total,
      allUsers: allUsers,
      page: page,
      maxPage: maxPage,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ================ BLACLIST AN USER ==============
router.put("/blackme/:id", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  let num = await User.find({ isAdmin: true }).countDocuments();

  let total = await User.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;

  try {
    const storedUser = await User.updateOne(
      { _id: req.params.id },
      { isActive: req.body.isActive }
    );

    const justMe = await User.find({ _id: req.params.id });

    let set = {};
    set["isTeacherJob"] = false;

    await Listing.updateMany({ email: justMe[0].email }, { $set: set });

    const allUsers = await User.find()
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      justMe: justMe,
      num: num,
      total: total,
      allUsers: allUsers,
      page: page,
      maxPage: maxPage,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ GET ALISTING.JS ==============
router.get("/listings", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Contract Type
    if (req.query.contract) {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = req.query.finishDate;

      const dt = new Date(start);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Listing.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,

        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// ================ HIDE LISTING (from Alistings.js) ===========
router.put("/sleepAd/:slug", async (req, res) => {
  const user = await Listing.findOne({ slug: req.params.slug });
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  const num = await Listing.find().countDocuments();

  let perPage = 10;
  let maxPage = Math.ceil(num / perPage);
  const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await Listing.updateOne(
      { slug: req.params.slug },
      { isTeacherJob: req.body.isTeacherJob }
    );
    const adPosts = await Listing.find({ isDeletedJob: false })
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedUser: storedUser,
      adPosts: adPosts,
      sort: sort,
      maxPage: maxPage,
      page: page,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ CREATE NEW SUBJECT ==============
router.post("/subject", async (req, res) => {
  try {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    // Check profession if already exist in database
    const subjectExist = await Subject.findOne({
      subjectName_en: req.body.subjectName_en,
      contractType: req.body.contractType,
      subjectName: req.body.subjectName,
    });
    if (subjectExist)
      return res.status(400).json({
        prompt: "Subject of this Category exists already.",
      });

    const subject = new Subject({
      contractType: req.body.contractType,
      subjectName_en: req.body.subjectName_en,
      subjectName: req.body.subjectName,
      showSubject: req.body.showSubject,
    });
    const savedSubject = await subject.save();

    const numOfSubjects = await Subject.find({
      showSubject: true,
    }).countDocuments();

    const subjects = await Subject.find({
      showSubject: true,
    });

    res.send({ subjects: subjects, numOfSubjects: numOfSubjects, sort: sort });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//======== SORT BY CONTRACT TYPE (From ASUBJECTS.JS) ============
router.get("/contractType", async (req, res) => {
  Subject.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Contract Type
    if (req.query.contract) {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    const num = await Subject.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const subjects = await Subject.find(match)
        .sort({ contractType: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        subjects: subjects,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//======== SORT BY SUBJECT NAME (From ASUBJECTS.JS) ============
router.get("/sortnames", async (req, res) => {
  Subject.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Contract Type
    if (req.query.contract) {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    const num = await Subject.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const subjects = await Subject.find(match)
        .sort({ subjectName: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        subjects: subjects,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//======== SORT BY SUBJECT ENG NAME (From ASUBJECTS.JS) =========
router.get("/sortnames_en", async (req, res) => {
  Subject.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Contract Type
    if (req.query.contract) {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    const num = await Subject.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const subjects = await Subject.find(match)
        .sort({ subjectName_en: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        subjects: subjects,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//============ GET ASUBJECTS.JS ==============
router.get("/subjects", async (req, res) => {
  Subject.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Contract Type
    if (req.query.contract) {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    // Created Dates
    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = req.query.finishDate;

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Subject.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const subjects = await Subject.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        subjects: subjects,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// ================ HIDE SUBJECT (from ASubjects.js) ============
router.put("/hideSubject/:id", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  let num = await Subject.find({ showSubject: true }).countDocuments();

  let total = await Subject.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;

  try {
    const storedSubject = await Subject.updateOne(
      { _id: req.params.id },
      { showSubject: req.body.showSubject }
    );

    const allSubjects = await Subject.find()
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedSubject: storedSubject,
      num: num,
      total: total,
      allSubjects: allSubjects,
      page: page,
      maxPage: maxPage,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ GET ADMIN DASHBOARD ==============
//from Admin dashboard
router.get("/dashboard/:email", async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.params.email });
    const noOfUsers = await User.findOne().countDocuments();
    // ============= TEACHERS =================
    const totalTeacher = await Teacher.find().countDocuments();

    const activeTeacher = await Teacher.find({
      showTeacher: true,
    }).countDocuments();
    const inactiveTeacher = await Teacher.find({
      showTeacher: false,
    }).countDocuments();

    const taipeitch = await Teacher.find({ state: "台北市" }).countDocuments();
    const taichungtch = await Teacher.find({
      state: "台中市",
    }).countDocuments();
    const kaohsiungtch = await Teacher.find({
      state: "高雄市",
    }).countDocuments();
    const tainantch = await Teacher.find({
      state: "台南市",
    }).countDocuments();
    const newTaipeitch = await Teacher.find({
      state: "新北市",
    }).countDocuments();
    const taoyuantch = await Teacher.find({
      state: "桃園市",
    }).countDocuments();
    const hsinchutch = await Teacher.find({
      state: "新竹縣",
    }).countDocuments();

    const pingtungtch = await Teacher.find({
      state: "屏東縣",
    }).countDocuments();

    const changhwatch = await Teacher.find({
      state: "彰化縣",
    }).countDocuments();

    const hualientch = await Teacher.find({
      state: "花蓮縣",
    }).countDocuments();

    // ============= LISTINGS =================
    const total = await Listing.find().countDocuments();
    const activeList = await Listing.find({
      isTeacherJob: true,
    }).countDocuments();
    const inactiveList = await Listing.find({
      isTeacherJob: false,
    }).countDocuments();

    const taipei = await Listing.find({ state: "台北市" }).countDocuments();
    const newTaipei = await Listing.find({ state: "新北市" }).countDocuments();
    const taoyuan = await Listing.find({ state: "桃園市" }).countDocuments();
    const hsinchu = await Listing.find({ city: "新竹縣" }).countDocuments();
    const taichung = await Listing.find({ state: "台中市" }).countDocuments();
    const changhwa = await Listing.find({ city: "彰化縣" }).countDocuments();
    const tainan = await Listing.find({ state: "台南市" }).countDocuments();
    const kaohsiung = await Listing.find({ state: "高雄市" }).countDocuments();
    const pingtung = await Listing.find({ city: "屏東縣" }).countDocuments();
    const hualien = await Listing.find({ city: "花蓮縣" }).countDocuments();

    // ============= APPLICATIONS =================

    const applications = await Pub.find().countDocuments();

    res.status(200).json({
      admin: admin,
      applications: applications,
      activeTeacher: activeTeacher,
      inactiveTeacher: inactiveTeacher,
      totalTeacher: totalTeacher,
      taipeitch: taipeitch,
      taichungtch: taichungtch,
      kaohsiungtch: kaohsiungtch,
      newTaipeitch: newTaipeitch,
      tainantch: tainantch,
      hualientch: hualientch,
      pingtungtch: pingtungtch,
      taoyuantch: taoyuantch,
      changhwatch: changhwatch,
      hsinchutch: hsinchutch,
      total: total,
      inactiveList: inactiveList,
      activeList: activeList,
      taipei: taipei,
      newTaipei: newTaipei,
      taoyuan: taoyuan,
      hsinchu: hsinchu,
      taichung: taichung,
      changhwa: changhwa,
      tainan: tainan,
      kaohsiung: kaohsiung,
      pingtung: pingtung,
      hualien: hualien,
      noOfUsers: noOfUsers,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============= ADMIN VIEW TEACHER =================
router.get("/teacherProfile/:teacherId", async (req, res) => {
  const teacher = await Teacher.findOne({ teacherId: req.params.teacherId });

  if (teacher) {
    res.redirect(
      process.env.FRONTEND_URL + "adminteacher/" + teacher.teacherId
    );
  }
});

//============ ADMIN GET TEACHER  ==============
router.get("/profile/:teacherId", async (req, res) => {
  try {
    const user = await Teacher.findOne({ teacherId: req.params.teacherId });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//============ ADMIN VIEW TEACHERS RESUME  ==============
router.get("/resumeCandidate/:teacherId", async (req, res) => {
  const teacher = await Teacher.findOne({ teacherId: req.params.teacherId });

  if (teacher === null) {
    res.redirect("/");
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "resumeCandidate/" + req.params.teacherId
    );
  }
});

//=========== ADMIN VIEW USER ============

router.get("/users/:id", async (req, res) => {
  const user = await User.findById({ _id: req.params.id });

  if (user === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(process.env.FRONTEND_URL + "adminusers/" + user._id);
  }
});

// ============= ADMIN DELETE SUBJECT ================
router.delete("/deleteSubject/:id", async (req, res) => {
  const deleted = await Subject.deleteOne({ _id: req.params.id });
  const subjects = await Subject.find();

  res.json({ deleted: deleted, subjects: subjects });
});

// ============= ADMIN RESET PASSWORD ================
router.put("/securitySettings/:_id", async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  //LETS VALIDATE THE DATA BEFORE
  const { error } = await passwordChangeConfirmation(req.body);

  if (error) return res.status(400).send({ invalid: error.details[0].message });

  const user = await User.findById({ _id: req.params._id });

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    User.findByIdAndUpdate(user._id, req.body).then(function () {
      user.password = hashedPassword;
      user.save();

      res.json({ user });
    });
  } catch (error) {
    res.send(error.message);
  }
});

//============ GET HOMEPAGE DATA ==============
//from homepage and Dashboard
router.get("/homepage", async (req, res) => {
  try {
    const num = await Listing.find({ isTeacherJob: true }).countDocuments();

    const noOfUsers = await User.findOne().countDocuments();

    const plans = await Homepage.findOne({ isAdmin: true });

    res.status(200).json({
      num: num,
      noOfUsers: noOfUsers,
      plans: plans,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============ FORGOT PASSWORD =================
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  // Check email if already exist in database
  const user = await User.findOne({ email: req.body.email, isAdmin: true });

  // User exists and create one-time link (valid for 10 minutes)

  if (user) {
    const secret = config.JWT_SECRET;
    const logo = "https://i.ibb.co/DQySCqY/mainLogo.png";

    const thisyear = moment().format("YYYY");
    const firstName = user.firstName;
    const payload = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "55m" });
    const link =
      process.env.FRONTEND_URL + `resetpassword/${user._id}/${token}`;
    forgotPasswordEmail(firstName, logo, link, email, thisyear);
    const subject = "愛課網 密碼重設";
    const to = `${email}`;
    const from = {
      email: "ceairhenry@gmail.com",
      name: "愛課網客服小組",
    };
    sendforgotPasswordEmail(to, from, subject, output);
    res.send(user);
  }
  if (!user) {
    return res.status(400).send({ user: "OK" });
  }
});

// Find resume
router.get("/resume/:teacherId", async (req, res) => {
  const teacher = await Teacher.findOne({ teacherId: req.params.teacherId });

  if (teacher === null) {
    res.redirect("/");
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "adminresume/" + req.params.teacherId
    );
  }
});

module.exports = router;
