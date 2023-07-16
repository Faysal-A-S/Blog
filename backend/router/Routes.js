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
  getMyBlogs,
  relatedBlogs,
} from "../controllers/blogController.js";

import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.get("/users", getUsers);
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/blog/all", getAllBlog);
router.get("/blog/:id", getBlog);
router.get("/blog/related/:id", relatedBlogs);
router.use(requireAuth);
router.get("/blog/myblog/blogs", getMyBlogs);
router.delete("/blog/:id", deleteBlog);
router.post("/blog/add", addBlog);

router.post("/blog/update/:id", updateBlog);

export default router;
