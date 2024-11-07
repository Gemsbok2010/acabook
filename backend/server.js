const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { config } = require("./config");
const mongoStore = require("connect-mongo")(session);
require("dotenv/config");
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const server = http.createServer(app);
const url = require("url");
const cors = require("cors");

app.use(
  session({
    secret: config.JWT_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
      httpOnly: false,
    },
    store: new mongoStore({
      url: process.env.DB_CONNECT,
      ttl: 1 * 24 * 60 * 60,
    }),
  })
);

mongoose.set("useFindAndModify", false);

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Import routes
const postsRoute = require("./routes/auth");
const usersRoute = require("./routes/authUsers");
const listingsRoute = require("./routes/authListings");
const teachersRoute = require("./routes/authTeacher");
const applicationsRoute = require("./routes/authApplication");
const securityRoute = require("./routes/authSecurity");

//Import routes (Merged Mandarin and English)
const adminRoute = require("./routes/administration");
const dashboardRoute = require("./routes/dashboard");
const coursesRoute = require("./routes/courses");

//Import routes (English)
const intlUsers = require("./routes/intlUsers");
const intlRoute = require("./routes/intl");
const intlListings = require("./routes/intlListings");
const intlSecurity = require("./routes/intlSecurity");
const intlteachers = require("./routes/intlTeacher");
const intlapplications = require("./routes/intlApplication");

const User = require("./models/userModel");
const { generateToken } = require("./util");
const passportSetup = require("./passport");

//Routes Middleware
app.use("/api/auth", postsRoute);
app.use("/api/users", usersRoute);
app.use("/api/listings", listingsRoute);
app.use("/api/teachers", teachersRoute);
app.use("/api/applications", applicationsRoute);
app.use("/api/secure", securityRoute);

//Routes Middleware (Merged Mandarin and English)
app.use("/api/admin", adminRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/courses", coursesRoute);

//Routes Middleware (English)
app.use("/api/intl", intlRoute);
app.use("/api/intlusers", intlUsers);
app.use("/api/intllistings", intlListings);
app.use("/api/intlapplications", intlapplications);
app.use("/api/intlsecure", intlSecurity);
app.use("/api/intlteachers", intlteachers);

//============== GOOGLE ROUTES ==============
let remainOnSamePage = "";
const storeRedirectIntoSession = (req, res, next) => {
  let url_parts = req.query.dd;
  if (url_parts === undefined) {
    remainOnSamePage = "";
    next();
  } else {
    url_parts = url_parts.replace("/", "");
    remainOnSamePage = url_parts;
    next();
  }
};

app.get(
  "/auth/google",
  storeRedirectIntoSession,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    await req.user;
    const token = generateToken(req.user);
    if (req.user.isAdmin) {
      res.cookie("adminToken", token, { httpOnly: false });
    }

    res.cookie("authToken", token, { httpOnly: false });
    req.session.user = req.user;
    let region = remainOnSamePage.slice(-2);
    if (region !== "en") {
      if (
        req.session.user.survey === "" ||
        req.session.user.phone === "" ||
        req.session.user.nationalId === "" ||
        req.session.user.gender === "" ||
        req.session.user.birth === "" ||
        req.session.user.street === ""
      ) {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              "personal-details" +
              "?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&token=" +
              token +
              "&access=false"
          );
        });
      } else if (
        remainOnSamePage == "login" ||
        remainOnSamePage == "signup" ||
        remainOnSamePage == "forgotpassword" ||
        remainOnSamePage === "emailMessage"
      ) {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              "?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&token=" +
              token +
              "&access=true"
          );
        });
      } else if (remainOnSamePage === "") {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              "?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&token=" +
              token +
              "&access=true"
          );
        });
      } else {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              remainOnSamePage +
              "?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&token=" +
              token +
              "&access=true"
          );
        });
      }
    } else {
      if (
        req.session.user.survey === "" ||
        req.session.user.phone === "" ||
        req.session.user.nationalId === "" ||
        req.session.user.gender === "" ||
        req.session.user.birth === "" ||
        req.session.user.street === ""
      ) {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              "personal-details/en" +
              "?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&access=false"
          );
        });
      } else if (
        remainOnSamePage == "login/en" ||
        remainOnSamePage == "signup/en" ||
        remainOnSamePage == "forgotpassword/en" ||
        remainOnSamePage === "emailMessage/en"
      ) {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              "en?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&token=" +
              token +
              "&access=true"
          );
        });
      } else if (remainOnSamePage === "en") {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              "en?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&token=" +
              token +
              "&access=true"
          );
        });
      } else {
        req.session.save(() => {
          res.redirect(
            process.env.FRONTEND_URL +
              remainOnSamePage +
              "?id=" +
              req.user._id +
              "&isLoggedIn=true" +
              "&token=" +
              token +
              "&access=true"
          );
        });
      }
    }
  }
);

////////////////////////////////////////////////////////////////////////////

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
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
}).single("gameFile");

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

app.post("/upload", async (req, res) => {
  upload(req, res, async (err) => {
    const email = req.session.user.email;
    const user = await User.findOne({ email });
  });
});

//Assets
app.use("/assets", express.static("assets"));
app.use("/public", express.static("public"));

//Connect to DB (returns a mongoose instance)
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => console.log("Connect to database")
);

//Listening
const port = 4000;

server.listen(process.env.PORT || 4000, function () {
  console.log(`server up and running ${port}`);
});
