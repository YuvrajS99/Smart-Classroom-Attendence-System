const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (token && token !== 'undefined' && token !== 'null') {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
      }
    } catch (error) {
      console.error("JWT Verification failed:", error.message);
    }
  }

  // We proceed regardless of token status. The route will handle optional user checking.
  return next();
};

module.exports = { protect };
