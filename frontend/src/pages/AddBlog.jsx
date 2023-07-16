import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddBlogMutation } from "../features/blogs/BlogsApi";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { user } = useSelector((state) => state.authUser);

  const [title, settitle] = useState("");
  const [topic, settopic] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [Error, setError] = useState(null);
  const [addBlog, { error, isLoading, isSuccess }] = useAddBlogMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (error?.data) {
      setError(error.data.message);
    } else {
      setError(null);
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [error, navigate, isSuccess]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBlog({
      token: user.token,
      data: { title, topic, description, image, user: user._id },
    });
  };
  return (
    <div className=" pt-5 mt-5 ">
      <div className="addBlog  mx-auto my-auto row  align-items-center p-5 mt-5">
        <h3 className="text-center align-top fw-bolder">Add New Blog</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingtitle"
              placeholder="example"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              required
            />
            <label htmlFor="floatingtitle" className="fw-bold">
              Title:
            </label>
          </div>
          <div className="form-floating mb-5">
            <input
              type="text"
              className="form-control"
              id="floatingtopic"
              placeholder="Password"
              onChange={(e) => settopic(e.target.value)}
              value={topic}
              required
            />
            <label htmlFor="floatingtopic" className="fw-bold">
              Topic:
            </label>
          </div>
          <div className="form-floating mb-5">
            <textarea
              type="text"
              className="form-control"
              id="floatingdescription"
              placeholder="desc"
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              style={{ height: "110px" }}
              required
            ></textarea>
            <label htmlFor="floatingdescription" className="fw-bold">
              Description:
            </label>
          </div>
          <div className="form-floating mb-5">
            <input
              type="text"
              className="form-control"
              id="floatingimage"
              placeholder="Password"
              onChange={(e) => setimage(e.target.value)}
              value={image}
              required
            />
            <label htmlFor="floatingimage" className="fw-bold">
              Image URL:
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn button-submit fw-bold"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
          {Error && <div className="text-danger fw-bolder m-1">{Error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
