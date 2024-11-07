const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const generate = require("nanoid-generate");
const generateNanoId = generate.numbers(5);
const { generateToken } = require("../util");

// Imports
const User = require("../models/userModel");
const { signUpInternational, loginInternational } = require("../validation");

//============ SIGN UP ==============
router.post("/signup", async (req, res) => {
  console.log(req.query);
  try {
    //LETS VALIDATE THE DATA BEFORE
    const { error } = signUpInternational(req.body);

    if (error)
      return res.status(400).json({ invalid: error.details[0].message });

    // Check email if already exist in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).json({
        prompt:
          "This <b>Email</b> address has already been registered. You may wish to try<a href='/forgotpassword/en'> Forgot Password?</a>",
      });

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Generate local timeone for MongoDB
    let now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 11;
    const day = now.getDate() + 10;
    now = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    const user = new User({
      nanoId: "A" + `${year}${month}${day}` + generateNanoId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      survey: "",
      gender: "",
      birth: "",
      nationalId: "",
      phone: "",
      country: "",
      password: hashedPassword,
      createdAt: now,
    });
    const savedUser = await user.save();

    const token = generateToken(savedUser);
    res.cookie("authToken", token, { httpOnly: false });

    res.send({ user: savedUser, token: token });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//=================== EMAIL LOGIN ================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Check email if already exist in database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({
      invalid:
        "Email or password incorrect. Please check your inputs and try again.",
    });
  }
  const firstName = user.firstName;

  //LETS VALIDATE THE DATA BEFORE
  const { error } = await loginInternational({
    email: email,
    password: password,
    firstName: firstName,
  });

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  // Password is correct?
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({
      invalid:
        "Email or password incorrect. Please check your inputs and try again.",
    });

  if (!user) {
    const errorMessage =
      "Email or password incorrect. Please check your inputs and try again.";
    res.status.send(errorMessage);
  } else {
    const authToken = generateToken(user);
    res.cookie("authToken", authToken, { httpOnly: false });
    if (user.isAdmin) {
      const adminToken = generateToken(user);
      res.cookie("adminToken", adminToken, { httpOnly: false });
    }
    res.json({ user, authToken });
  }
});

//=================== EMAIL LOGIN ==============
router.post("/logout/en", async (req, res) => {
  // res.cookie("connect.sid", '');
  res.clearCookie("connect.sid");

  // res.send('success')

  res.json({ sucess: true });
});

//=================== LOGOUT ================
router.get("/logout/en", async (req, res) => {
  res.clearCookie("connect.sid", "", { maxAge: 1 });
  res.clearCookie("authToken", "", { maxAge: 1 });
  res.json({ success: true });
});

module.exports = router;
