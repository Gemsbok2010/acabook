const express = require("express");
const router = express.Router();
const moment = require("moment");
const generate = require("nanoid-generate");
const generateCaseId = generate.numbers(5);

// Imports
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const Pub = require("../models/applicationModel");
const Subject = require("../models/subjectModel");

const {
  question6Validation,
  question7Validation,
  questionGoogleMapValidation,
} = require("../validation");

//============ GET SUBJECTS ==============
router.get("/subjects", async (req, res) => {
  try {
    const subject = await Listing.find();
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET SEARCH FILTERS ==============
router.get("/search", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let locatie = req.query.location;

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = { isTeacherJob: true, isDeletedJob: false };

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

    // Subjects
    if (req.query.subjects) {
      const breakSubjects = req.query.subjects;
      const subjectArr = breakSubjects.split(",");
      const ans = { subjects: subjectArr };

      let subjects = [];
      if (subjectArr) {
        subjects = subjectArr;
        match["subjects"] = subjects;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location) {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    const num = await Listing.find(match).countDocuments();
    const subjects = await Subject.find({ showSubject: true });

    let perPage = 6;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      // GET LONGITUDE AND LATITUDE
      let longArr = [];

      for (var i = 0; i < adPosts.length; i++) {
        var results = adPosts[i].longitude;
        longArr.push(results);
      }

      let latArr = [];

      for (var j = 0; j < adPosts.length; j++) {
        var posts = adPosts[j].latitude;
        latArr.push(posts);
      }

      res.status(200).json({
        adPosts: adPosts,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
        subjects: subjects,
        longArr: longArr,
        latArr: latArr,
        location: locatie,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//============ GET SUBJECTS IN QUESTION 3 ==============
router.get("/question3", async (req, res) => {
  Subject.paginate({}, {}).then(async (result) => {
    const num = await Subject.find({
      showSubject: true,
      contractType: req.query.contract,
    }).countDocuments();

    let perPage = 7;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    try {
      const subjects = await Subject.find({
        showSubject: true,
        contractType: req.query.contract,
      })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        subjects: subjects,
        maxPage: maxPage,
        page: page,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//============ UPDATE IN QUESTION 6 ==============
router.put("/question6", async (req, res, next) => {
  const { error } = question6Validation(req.body);
  if (error) return res.status(400).json({ invalid: error.details[0].message });
  res.send(req.body);
});

//============ UPDATE IN QUESTION 7 ==============
router.put("/question7", async (req, res, next) => {
  const { error } = question7Validation(req.body);
  if (error) return res.status(400).json({ invalid: error.details[0].message });
  res.send(req.body);
});

//============ UPDATE IN QUESTION 9 ==============
router.put("/question9", async (req, res, next) => {
  let todaysDate = moment().format(`YYYY年 MM月 DD日`);

  const { error } = questionGoogleMapValidation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });
  req.body.todaysDate = todaysDate;
  res.send(req.body);
});

//============ UPDATE IN QUESTION 10 ==============
router.post("/question10", async (req, res, next) => {
  const streetNo = req.body.streetNo;
  const myArray = streetNo.split("");
  const last = myArray.at(-1);
  if (last === "號") {
    req.body.streetNo;
  } else {
    req.body.streetNo = req.body.streetNo + "號";
  }

  let dt = new Date();
  const year = dt.getFullYear();
  const dag = dt.getDate();

  const storeExp = new Date(req.query.expiryDate);

  storeExp.setDate(storeExp.getDate() + 1);

  const user = await User.findOne({ email: req.body.email });

  // Generate local timeone for MongoDB
  dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

  const list = new Listing({
    caseId: `${year}${dag}` + generateCaseId,
    contractType: req.body.contractType,
    subjects: req.body.subjects,
    subjects_en: req.body.subjects_en,
    level: req.body.level,
    about: req.body.about,
    frequency: req.body.frequency,
    duration: req.body.duration,
    isTeacherJob: req.body.isTeacherJob,
    todaysDate: req.body.todaysDate,
    streetNo: req.body.streetNo,
    street: req.body.street,
    suburb: req.body.suburb,
    postalCode: req.body.postalCode,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday,
    monStart: req.body.monStart,
    tueStart: req.body.tueStart,
    wedStart: req.body.wedStart,
    thuStart: req.body.thuStart,
    friStart: req.body.friStart,
    satStart: req.body.satStart,
    sunStart: req.body.sunStart,
    monFinish: req.body.monFinish,
    tueFinish: req.body.tueFinish,
    wedFinish: req.body.wedFinish,
    thuFinish: req.body.thuFinish,
    friFinish: req.body.friFinish,
    satFinish: req.body.satFinish,
    sunFinish: req.body.sunFinish,
    home_rate: req.body.home_rate,
    normal_rate: req.body.normal_rate,
    zoom_rate: req.body.zoom_rate,
    transport: req.body.transport,
    foreigner: req.body.foreigner,
    home_tutoring: req.body.home_tutoring,
    // standard
    filename: req.body.filename,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: user.phone,
    expiryDate: storeExp,
    createdAt: dt,
  });
  try {
    const storedList = await list.save();
    res.send(storedList);
  } catch (err) {
    res.redirect(process.env.FRONTEND_URL + "/dashboard");
  }
});

//============ GET LISTINGMANAGER.JS ==============
router.get("/listingmanager", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }


    const email = req.query.email;
    let match = { email: email, isDeletedJob: false };
    let Cmatch = { isRejected: false, slugId: req.query.slug };

    // Contract Type
    if (req.query.contract !== "") {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
        Cmatch["contractType"] = contract;
      }
    }

    // Subjects
    if (req.query.subjects !== "") {
      const breakSubjects = req.query.subjects;
      const subjectArr = breakSubjects.split(",");
      const ans = { subjects: subjectArr };

      let subjects = [];
      if (subjectArr) {
        subjects = subjectArr;
        match["subjects"] = subjects;
        Cmatch["subjects"] = subjects;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
      Cmatch["state"] = stateArr;
    }

    const num = await Listing.find(match).countDocuments();

    const subjects = await Subject.find({ showSubject: true });

    let perPage = 10;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      const candidates = await Pub.find(Cmatch).sort({ createdAt: sort });

      const candidat = await Listing.find({
        email: email,
        isTeacherJob: true,
      });

      let slugArr = [];
      for (var i = 0; i < candidat.length; i++) {
        var results = candidat[i].slug;
        slugArr.push(results);
      }

      const newApplicants = await Pub.find({
        slugId: slugArr,
        seen: false,
        isRejected: false,
      });

   

      res.status(200).json({
        adPosts: adPosts,
        candidates: candidates,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
        newApplicants: newApplicants,
        subjects: subjects,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// Candidates Slug Number (from listingManager.ejs)
router.put("/sleepAd/:slug", async (req, res) => {
  const user = await Listing.findOne({ slug: req.params.slug });
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  // try {
  // New data (from req.body) to database
  //   Listing.findByIdAndUpdate(user._id, req.body).then(function () {
  //     Listing.findById(user._id).then(function (storedUser) {
  //       storedUser.save();
  //       res.send(storedUser);
  //     });
  //   });
  // } catch (err) {
  //   res.status(400).json({ err });
  // }

  const num = await Listing.find({
    isTeacherJob: req.body.isTeacherJob,
    slug: req.params.slug,
    isDeletedJob: false,
  }).countDocuments();

  let perPage = 10;
  let maxPage = Math.ceil(num / perPage);
  const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await Listing.updateOne(
      { slug: req.params.slug },
      { isTeacherJob: req.body.isTeacherJob }
    );
    let adPosts = await Listing.find({
      email: user.email,
      isDeletedJob: false,
    }).sort({
      createdAt: sort,
    });

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

// Candidates Slug Number (from listingManager.ejs)
router.get("/candidates", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};
    const email = req.query.email;
    match = { email: email, isDeletedJob: false };

    // Contract Type
    if (req.query.contract !== "" || req.query.contract !== undefined) {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    // Subjects
    if (req.query.subjects !== "" || req.query.subjects !== undefined) {
      const breakSubjects = req.query.subjects;
      const subjectArr = breakSubjects.split(",");
      const ans = { subjects: subjectArr };

      let subjects = [];
      if (subjectArr) {
        subjects = subjectArr;
        match["subjects"] = subjects;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    const subjects = await Subject.find({ showSubject: true });
    const num = await Listing.find({
      email: email,
      isDeletedJob: false,
    }).countDocuments();
    let totalItems = result.totalDocs;
    let perPage = 10;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    try {
      const adPosts = await Listing.find({ email: email, isDeletedJob: false })
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      const candidates = await Pub.find({
        slugId: req.query.slug,
        isRejected: false,
      }).sort({ createdAt: "desc" });

      res.status(200).json({
        adPosts: adPosts,
        candidates: candidates,
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

//=========== VIEW OR REDIRECT TO AD DETAILS ============
// (from searchlist.js and applicationsManager.js)
//View by Slug Number page
router.get("/adPosts/:slug", async (req, res) => {
  const post = await Listing.findOne({ slug: req.params.slug });
  if (post === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(process.env.FRONTEND_URL + "Ad_details/" + req.params.slug);
  }
});

//=========== GET AD DETAILS ============
// (from searchlist.js and applicationsManager.js)
//View by Slug Number page
router.get("/Ad_details/:slug", async (req, res) => {
  try {
    const listing = await Listing.findOne({ slug: req.params.slug });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
});

//=========== EDIT AD DETAILS ============
//Edit Slug Number page (from listingManager.ejs)
router.get("/edit/:slug", async (req, res) => {
  const post = await Listing.findOne({ slug: req.params.slug });
  if (post === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(process.env.FRONTEND_URL + "ListingEdit/" + req.params.slug);
  }
});

//=========== GET AD DETAILS ============
// (from searchlist.js and applicationsManager.js)
//View Slug Number page
router.get("/edit/:slug", async (req, res) => {
  try {
    const listing = await Listing.findOne({ slug: req.params.slug });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============= UPDATE IN EDIT ================
router.put("/edit", async (req, res, next) => {
  Listing.findByIdAndUpdate(req.body.slug, req.body).then(function (
    storedUser
  ) {
    res.send(storedUser);
  });
});

// ============= DELETE IN EDIT ================
router.put("/delete/:slug", async (req, res) => {
  try {
    let set = {};
    set["isDeletedJob"] = req.body.isDeletedJob;
    set["isTeacherJob"] = req.body.isTeacherJob;

    const storedUser = await Listing.updateMany(
      { slug: req.params.slug },
      { $set: set }
    );

    res.json({
      storedUser: storedUser,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ============= REJECT CANDIDATE ================
router.put("/reject/:slug/:nanoId", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  try {
    const nanoslug = req.params.nanoId + req.params.slug;

    const num = await Listing.find({
      nanoId: req.params.nanoId,
      isRejected: false,
    }).countDocuments();

    let perPage = 10;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    const rejected = await Pub.updateOne(
      { nanoslug: nanoslug },
      { isRejected: true }
    );

    const candidat = await Listing.find({
      nanoId: req.params.nanoId,
      isTeacherJob: true,
    });

    let slugArr = [];
    for (var i = 0; i < candidat.length; i++) {
      var results = candidat[i].slug;
      slugArr.push(results);
    }

    const newApplicants = await Pub.find({
      slugId: slugArr,
      seen: false,
      isRejected: false,
    });

    const candidates = await Pub.find({
      slugId: req.params.slug,
      isRejected: false,
    }).sort({ createdAt: sort });

    res.send({
      candidates: candidates,
      newApplicants: newApplicants,
      rejected: rejected,
      maxPage: maxPage,
      page: page,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }

  // const rejected = await Pub.deleteOne({ nanoslug: nanoslug });
  // res.send(rejected);
});

module.exports = router;
