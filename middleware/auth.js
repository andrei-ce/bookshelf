const jwt = require('jsonwebtoken');
const config = require('config');

// Any route that required authentication will pass through this middleware
module.exports = (req, res, next) => {
  try {
    // Get the token from header (if no token, send error)
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, no access' });
    }
    console.log('token extracted');
    console.log(token);

    // Verify token
    jwt.verify(token, config.get('JWT_SECRET'), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Invalid Token' });
      } else {
        // req.user will contain the user id (req.user.id)
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('Auth middleware problems...');
    res.status(500).json({ msg: 'Server error' });
  }
};
