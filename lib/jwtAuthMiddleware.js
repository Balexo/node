const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const tokenJWT = req.get("Authorization") || req.body.jwt || req.query.jwt;
  if (!tokenJWT) {
    next(createError(401, "not token provided"));
    return;
  }

  jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        next(createError(401, "Expired token"));
      } else {
        next(createError(401, "invalid token"));
      }
      return;
    }
    req.apiUserId = payload.apiUserId;
    next();
  });
};
