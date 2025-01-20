import jsonwebtoken from "jsonwebtoken";
import User from "../models/user-model.js";

const generateToken = (id, role) => {
  return jsonwebtoken.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export async function registerUser(req, res) {
  const { username, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password, role });
    return res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
