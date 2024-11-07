const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

require("dotenv/config");
const { google } = require("./config");
const User = require("./models/userModel");
const generate = require("nanoid-generate");
const myId = generate.numbers(9);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//Google
passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: "/auth/google/callback",
      // passReqToCallback   : true
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if user already exists in db
      User.findOne({ email: profile.emails[0].value }).then((existingUser) => {
        if (existingUser) {
          // already have the user
          done(null, existingUser);
        } else {
          //if not create a new user

          new User({
            nanoId: "G" + myId,
            lastName: profile.family_name,
            firstName: profile.given_name,
            email: profile.emails[0].value,
            isTeacher: false,
            googleId: profile.id,
            survey: "",
            gender: "",
            birth: "",
            nationalId: "",
            phone: "",
            country: "",
            filename: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
