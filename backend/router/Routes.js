import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
} from "../controllers/userController.js";
import {
  addBlog,
  getAllBlog,
  updateBlog,
  getBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();
router.get("/users", getUsers);
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/blog/all", getAllBlog);
router.get("/blog/:id", getBlog);
router.delete("/blog/:id", deleteBlog);
router.post("/blog/add", addBlog);
router.put("/blog/update/:id", updateBlog);
export default router;
