import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/User/UserSlice";
import IsLogin from "../utils/isLogin";
const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const loginCheck = IsLogin();
  const dispatch = useDispatch();
  let Url = window.location.href.split("/");
  let cUrl = Url[Url.length - 1];
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#69afe5" }}
    >
      <Link
        className="p-2 ms-3 fs-2 fw-bolder navbar-brand"
        to="/"
        style={{ textDecoration: "none", color: "black" }}
      >
        BlogApp
      </Link>
      <button
        className="navbar-toggler m-1"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div
          style={{
            display: "flex",

            marginLeft: "auto",
          }}
        >
          {loginCheck && (
            <ul className="nav nav-tabs fs-5 navbar-nav">
              <Link
                to="/blogs"
                className={`nav-item nav-link p-2 ${
                  cUrl === "" || cUrl === "blogs" ? "active" : ""
                } `}
                onClick={() => setActive("ab")}
              >
                All Blogs
              </Link>

              <Link
                to="/myBlog"
                className={`nav-item nav-link p-2 ${
                  cUrl === "myBlog" ? "active" : ""
                } `}
                onClick={() => setActive("mb")}
              >
                My Blogs
              </Link>
              <Link
                to="/addblog"
                className={`nav-item nav-link p-2 ${
                  cUrl === "addblog" ? "active" : ""
                } `}
                onClick={() => setActive("adb")}
              >
                Add Blog
              </Link>
            </ul>
          )}
        </div>
        <div className="btn-container navbar-nav my-1">
          {!loginCheck ? (
            <>
              <button
                className="btn button mx-2 fw-bold"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn button ms-2 me-4 fw-bold"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="btn button ms-2 me-4 fw-bold "
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
