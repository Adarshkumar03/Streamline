const User = require("../models/User.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register_user = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
      projects: [],
    });
    const savedUser = await newUser.save();
    const payload = { sub: savedUser._id };
    const token = jwt.sign(payload, process.env.secret, { expiresIn: "1d" });
    res.json({ token, username: savedUser.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login_user = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const payload = { sub: user._id };
      const token = jwt.sign(payload, process.env.secret, { expiresIn: "1d" });
      res.json({ username: user.username, token });
    });
  })(req, res);
};

const get_users_list = async (req, res, next) => {
  return res.json({message: "User list"});
};

module.exports = {
  register_user, get_users_list, login_user
}
