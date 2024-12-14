const users = require("../Model/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("inside register function");
  const { userName, email, password } = req.body;
  try {
    // check the user already exist or not
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("user already exist");
    } else {
      const newUser = new users({
        userName,
        email,
        password,
        github: "",
        linkedin: "",
        profile: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.login = async (req, res) => {
  console.log("inside login function");
  const { email, password } = req.body;
  try {
    // check the user already exist or not
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      //generate token
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.jwt_secret
      );
      res.status(200).json({ existingUser, token });
    } else {
      res.status(406).json("inavlid email/password");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { github, linkedin } = req.body;
    const userId = req.payload;
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (github) user.github = github;
    if (linkedin) user.linkedin = linkedin;

    if (req.file) {
      user.profile = req.file.path;
    }
    await user.save();
    res.status(200).json({ message: "Profile updated successfully!", user });
  } catch (err) {
    res.status(401).json(err);
  }
};
