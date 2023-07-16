import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import MyBlog from "./pages/MyBlog";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import { useDispatch } from "react-redux";
import { authenticatedUser } from "./features/User/UserSlice";
import IsLogin from "./utils/isLogin";
import BlogMain from "./pages/BlogMain";

function App() {
  const dispatch = useDispatch();
  const loginCheck = IsLogin();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(authenticatedUser({ ...user }));
    }
  }, [dispatch]);
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogMain />} />
        <Route path="/" element={<Blogs />} />
        {loginCheck && (
          <>
            <Route path="/myBlog" element={<MyBlog />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/myBlog/edit/:id" element={<EditBlog />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
