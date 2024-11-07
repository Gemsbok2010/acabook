const express = require("express");
const router = express.Router();

// Imports
const Pub = require("../models/applicationModel");
const Listing = require("../models/listingModel");
const Subject = require("../models/subjectModel");
const User = require("../models/userModel");
const { applicationInternational } = require("../validation");

//Applications
router.post("/applications", async (req, res, next) => {
  const { error } = applicationInternational(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  const application = new Pub({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nanoId: req.body.nanoId,
    yourpay: req.body.yourpay,
    hometutor: req.body.hometutor,
    onlinetutor: req.body.onlinetutor,
    slugId: req.body.slugId,
    nanoslug: req.body.nanoId + req.body.slugId,
    caseId: req.body.caseId,
    isTeacher: req.body.isTeacher,
    photo: req.body.photo,
    phone: req.body.phone,
    email: req.body.email,
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    streetNo: req.body.streetNo,
    street: req.body.street,
    suburb: req.body.suburb,
    state: req.body.state,
    city: req.body.city,
    country: req.body.country,
  });
  const storedApplication = await application.save();

  res.send(storedApplication);
});

router.get("/applied", async (req, res, next) => {
  try {
    const applied = await Pub.find({ nanoId: req.query.nanoId });

    res.status(200).json({ applied: applied });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res, next) => {
  const who = await User.find({ nanoId: req.query.nanoId });

  try {
    const taipei = await Listing.find({
      state: "台北市",
      isDeletedJob: false,
      isTeacherJob: true,
    }).countDocuments();
    const newTaipei = await Listing.find({
      state: "新北市",
      isDeletedJob: false,
      isTeacherJob: true,
    }).countDocuments();
    const kaohsiung = await Listing.find({
      state: "高雄市",
      isDeletedJob: false,
      isTeacherJob: true,
    }).countDocuments();

    const applied = await Pub.find({
      nanoId: req.query.nanoId,
    }).countDocuments();

    const seen = await Pub.find({
      seen: true,
      nanoId: req.query.nanoId,
    }).countDocuments();

    res.status(200).json({
      applied: applied,
      seen: seen,
      taipei: taipei,
      newTaipei: newTaipei,
      kaohsiung: kaohsiung,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/Ad_details/:slug", async (req, res, next) => {
  const nanoslug = req.query.nanoId + req.params.slug;
  try {
    const applied = await Pub.find({ nanoslug: nanoslug });

    res.status(200).json({ applied: applied });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET APPLICATIONSMANAGER.JS ==============
router.get("/applicationsmanager", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};
    let email = req.query.email;

    // Contract Type
    if (req.query.contract !== "") {
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
    if (req.query.subjects !== "") {
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

    try {
      const candidates = await Pub.find({
        email: email,
        slugId: req.query.slug,
      }).sort({ createdAt: "desc" });

      const candidat = await Pub.find({
        email: email,
      }).sort({ createdAt: "desc" });

      let slugArr = [];
      for (var i = 0; i < candidat.length; i++) {
        var results = candidat[i].slugId;
        slugArr.push(results);
      }
      match["slug"] = slugArr;

      console.log(match, "match");
      const subjects = await Subject.find({ showSubject: true });
      const num = await Listing.find(match).countDocuments();
      let perPage = 10;
      let maxPage = Math.ceil(num / perPage);
      const page =
        req.query.page && num > perPage ? parseInt(req.query.page) : 1;

      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

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

// Applications Manager Your application Slug Number
router.get("/myapplications/:slug", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};
    const email = req.query.email;

    // Contract Type
    if (req.query.contract !== "") {
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
    if (req.query.subjects !== "") {
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
    if (req.query.location !== "" && req.query.city === "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    try {
      const candidates = await Pub.find({
        email: email,
        slugId: req.params.slug,
      }).sort({ createdAt: "desc" });

      const candidat = await Pub.find({
        email: email,
      }).sort({ createdAt: "desc" });

      let slugArr = [];
      for (var i = 0; i < candidat.length; i++) {
        var results = candidat[i].slugId;
        slugArr.push(results);
      }
      match["slug"] = slugArr;

      console.log(match, "match");

      const num = await Listing.find(match).countDocuments();
      let perPage = 10;
      let maxPage = Math.ceil(num / perPage);
      const page =
        req.query.page && num > perPage ? parseInt(req.query.page) : 1;

      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
        candidates: candidates,
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

// ============= WITHDRAW APPLICATION ================
router.delete("/withdraw/:slug/:nanoId", async (req, res) => {
  const nanoslug = req.params.nanoId + req.params.slug;

  const withdraw = await Pub.deleteOne({ nanoslug: nanoslug });
  res.send(withdraw);
});

module.exports = router;
