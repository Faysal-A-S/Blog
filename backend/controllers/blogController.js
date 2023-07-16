import Blog from "../schemas/blog.js";
import User from "../schemas/user.js";

export const getAllBlog = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user", "name");
    if (!blogs) {
      res.status(404).json({ message: "No blogs Found" });
    }
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
export const addBlog = async (req, res, next) => {
  const { title, topic, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
  if (!title || !description || !topic || !image || !user) {
    res.status(403).json({ message: "Please fill all the fields" });
  }
  if (!existingUser) {
    res.status(404).json({ message: "User not found" });
  }
  try {
    const newBlog = new Blog({ title, topic, description, image, user });
    await newBlog.save();
    await User.updateOne(
      { _id: existingUser._id },
      { $push: { blogs: newBlog._id } }
    );
    res.status(200).json({ newBlog });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
export const updateBlog = async (req, res) => {
  const { title, topic, description, image, user } = req.body;
  let id = req.params.id;

  let updatedBlog;
  try {
    let existingBlog = await Blog.find({ _id: id });

    if (existingBlog) {
      updatedBlog = await Blog.findByIdAndUpdate(id, {
        title,
        topic,
        description,
        image,
        user,
      });
      res.status(200).json({ updatedBlog });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
export const getBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.find({ _id: id });
    if (blog) {
      res.status(200).json({ blog });
    } else {
      res.status(404).json({ message: "No blog found" });
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);

    if (blog) {
      await User.updateOne({ _id: blog.user }, { $pull: { blogs: id } });
      let deletedBlog = await Blog.deleteOne({ _id: id });
      res.status(200).json({ deletedBlog });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const getMyBlogs = async (req, res) => {
  let blogs;
  let user_id = req.user._id;

  try {
    blogs = await Blog.find({ user: user_id }).populate("user", "name");
    if (!blogs) {
      res.status(404).json({ message: "No blogs Found" });
    }
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(401).json({ message: "err.message" });
  }
};

export const relatedBlogs = async (req, res) => {
  const id = req.params.id;

  try {
    const topic = await Blog.findById(id);
    const related = await Blog.find(
      { topic: topic.topic, _id: { $ne: topic._id } },
      { title: 1, _id: 1 }
    );

    return res.status(200).json({ related });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};
