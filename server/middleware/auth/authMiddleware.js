const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN_SECRET,
  USER_TOKEN_NAME,
} = require("../../constants/auth");

module.exports = (req, res, next) => {
  let token;

  console.log(`req.cookies`, req.cookies);

  if (req.cookies[USER_TOKEN_NAME]) {
    token = req.cookies[USER_TOKEN_NAME];
  }

  res.locals.payload = getPayload(token);

  res.locals.isAuth = !!res.locals.payload;

  console.log(`token`, token);
  console.log(`res.locals.payload`, res.locals.payload);
  console.log(`res.locals.isAuth`, res.locals.isAuth);

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
