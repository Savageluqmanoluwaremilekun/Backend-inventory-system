const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth.models');

// Register user
async function register(req, res) {
  const { name, email, password, role } = req.body;
  // console.log(req.body)
  if (! name || !email || !password) {
    return res.status(404).json({message: "Please input all fields"})
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Default role to 'user' if not specified
    const userRole = role || 'user';

    user = new User({ name, email, password, role: userRole });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ message: "Registration successful",
        token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Login user
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({message: "Please provide all fields!"})
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ message: `Welcome ${user.name}!`,
        token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  register,
  login,
}
