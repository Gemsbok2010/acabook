const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const url = require("url");
const fs = require("fs-extra");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// Imports
const User = require("../models/userModel");
const Listing = require("../models/listingModel");
const Teacher = require("../models/teacherModel");
const Pub = require("../models/applicationModel");
const { uploadFile } = require("../../s3");
const { detailsValidation } = require("../validation");

//============ GET ALLUSER PAGE ==============
router.get("/allusers/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



//============ DELETE PHOTO ==============
router.delete("/allusers/:id", async (req, res, next) => {
  let unset = {};
  unset["filename"] = null;

  const deleted = await User.updateOne(
    { _id: req.params.id },
    { $unset: unset }
  );
  res.status(204).json(deleted);
});

//==================== UPDATE IN ALLUSERS =================
router.put("/allusers", async (req, res, next) => {
  try {
    const { error } = detailsValidation(req.body);

    if (error)
      return res.status(400).json({ invalid: error.details[0].message });

    const streetNo = req.body.streetNo;
    const myArray = streetNo.split("");

    const last = myArray.at(-1);
    if (last === "號") {
      req.body.streetNo;
    } else {
      req.body.streetNo = req.body.streetNo + "號";
    }
    const email = req.body.email;
    const teacher = await Teacher.findOne({ email });
    const user = await User.findOne({ email });

    if (teacher) {
      let set = {};
      set["firstName"] = req.body.firstName;
      set["lastName"] = req.body.lastName;
      await Teacher.updateOne({ nanoId: teacher.nanoId }, { $set: set });
      await Pub.updateMany({ nanoId: teacher.nanoId }, { $set: set });
    }

    if (teacher) {
      let set = {};
      set["nationalId"] = req.body.nationalId;
      await Teacher.updateOne({ nanoId: teacher.nanoId }, { $set: set });
    }

    let set = {};
    set["filename"] = req.body.filename;
    set["firstName"] = req.body.firstName;
    set["lastName"] = req.body.lastName;
    await Listing.updateMany({ email: email }, { $set: set });

    // New data (from req.body) to database
    User.findByIdAndUpdate(user._id, req.body).then(function () {
      User.findOne(user._id).then(function (storedUser) {
        storedUser.save();
        res.send(storedUser);
      });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ UPLOAD IMAGES ==============

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "./frontend/public/uploads/",
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
  try {
    upload(req, res, async (err) => {
      const email = req.query.email;
      const user = await User.findOne({ email });

      if (req.file === undefined) {
        res.json({
          invalid:
            "無法執行: 上傳圖片檔案超過容量限制或是檔案類別不被允許上傳.",
        });
      } else {
        const result = await uploadFile(req.file);

        await unlinkFile(req.file.path);

        let set = {};
        set["filename"] = result.Location;
        await Listing.updateMany({ email: email }, { $set: set });

        User.findByIdAndUpdate(user._id, {
          filename: result.Location,
        }).then(function () {
          User.findOne({ email: req.query.email }).then(function (storedUser) {
            storedUser.save(() => {
              res.json({ storedUser: storedUser, newImage: result.Location });
            });
          });
        });
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/adminUpload", async (req, res) => {
  upload(req, res, async (err) => {
    const email = req.query.email;
    const user = await User.findOne({ email });

    if (req.file === undefined) {
      res.redirect(process.env.FRONTEND_URL + "adminusers/" + user._id);
    } else {
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      User.findByIdAndUpdate(user._id, {
        filename: result.Location,
      }).then(function () {
        User.findOne({ email: req.query.email }).then(function (storedUser) {
          storedUser.save(() => {
            res.redirect(process.env.FRONTEND_URL + "adminusers/" + user._id);
          });
        });
      });
    }
  });
});

module.exports = router;
