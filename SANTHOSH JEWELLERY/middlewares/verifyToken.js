const jwt = require("jsonwebtoken");
require("dotenv").config();

expired = null;
exports.verifyToken = async function (req, res, next) {
  const token = await req.header["authorization"];
  if (token) {
    bearerToken = await token.split(" ")[1];
  }
  if (bearerToken) {
    jwt.verify(
      bearerToken,
      "process.env.SJ_VERIFY_TOKEN",
      function (err, decode) {
        try {
          expired = err;
          let lastDate = expired.expiredAt.toLocaleDateString();
          let lastTime = expired.expiredAt.toLocaleTimeString();
          let loggedOut = `logged out ${lastDate} at ${lastTime}`;
          res
            .status(400)
            .json({ message: "token expired", Error: expired, loggedOut });
        } catch (err) {
          res
            .status(400)
            .json({ message: "token expired", Error: err, loggedOut });
        }
        if (decode) {
          req.admin = decode._id;
        }
      }
    );
  }
};
