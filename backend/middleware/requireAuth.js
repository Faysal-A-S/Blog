import jwt from "jsonwebtoken";
import User from "./../schemas/user.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Auth token required" });
  }

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: id }).select("_id");
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default requireAuth;
