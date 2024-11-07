const config = {
  JWT_SECRET: process.env.JWT_SECRET || "somesecret",
};

const google = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports.google = google;
module.exports.config = config;
