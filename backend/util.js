const jwt = require("jsonwebtoken");

const { config } = require("./config");
require("dotenv/config");

const generateToken = (user) => {
  const maxAge = 1 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: maxAge,
    }
  );
  return token;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.redirect("/");

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      return res.redirect("/");
    }
    req.user = user;
    next();
  });
};

module.exports.generateToken = generateToken;
module.exports.authenticateToken = authenticateToken;
