import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Authorization Header:", req.headers.authorization);
    console.log("Decoded User:", req.user);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default authMiddleware;
