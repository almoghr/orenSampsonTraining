const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../../constants/auth");

module.exports = (req, res, next) => {
  let token;
  if (req.cookies[tokenName]) {
    token = req.cookies[tokenName];
  }

  res.locals.payload = getPayload(token);

  res.locals.isAuth = !!res.locals.payload;

  return next();
};

const getPayload = (token) => {
  if (!token) {
    return null;
  }

  let decodedTokenPayload;
  try {
    decodedTokenPayload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedTokenPayload) {
      throw new Error();
    }
  } catch (error) {
    return null;
  }

  return decodedTokenPayload;
};
