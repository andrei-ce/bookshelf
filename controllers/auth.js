const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// GET USER by sending JWT
// =========================
exports.getUser = async (req, res) => {
  try {
    //req.user comes from auth middleware and contains: {id: user._id}
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error on authentication');
  }
};

// LOGIN USER
// =========================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
    }

    // return JWT
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      config.get('JWT_SECRET'),
      { expiresIn: '1 day' },
      (err, token) => {
        if (err) throw err;
        console.log(`User '${user.username}' saved`);
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error: on login user in!');
  }
};

// REGISTER USER
// =========================
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // see if user exists already: no duplicate emails
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Email already registered' }] });
    }

    user = new User({
      username,
      email,
      password,
    });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // save user with password hashed
    await user.save();

    //return JWT
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      config.get('JWT_SECRET'),
      { expiresIn: '1 day' },
      (err, token) => {
        if (err) throw err;
        console.log(`User '${user.username}' saved`);
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error: on register user!');
  }
};
