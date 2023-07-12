import User from "../schemas/user.js";
import bcrypt from "bcryptjs";
export const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users Found!!!" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(403).json({ message: "Please fill all the fields!!" });
  }
  let existingUser = await User.findOne({ email });
  if (!existingUser) {
    try {
      let hashedPassword = bcrypt.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
      });
      await newUser.save();
      return res.status(201).json({ message: "User created!" });
    } catch (err) {
      return res.status(403).json({ message: err.message });
    }
  } else {
    return res.status(403).json({ message: "User already exists" });
  }
};
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      const isCorrectPassword = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (isCorrectPassword) {
        return res.status(200).json({ message: "User logged in" });
      }
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    return res
      .status(404)
      .json({ message: "User with this email is unavailable" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
