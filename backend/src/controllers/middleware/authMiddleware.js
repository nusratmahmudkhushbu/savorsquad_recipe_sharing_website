const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get token from header
  let token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  console.log(token)

  try {
    // Verify token
    const decoded = jwt.verify(token, 'secret'); 

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

module.exports = verifyToken;
