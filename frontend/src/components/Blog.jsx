import React, { useEffect, useState } from "react";
import textShortner from "../utils/textShortner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDeleteBlogMutation } from "../features/blogs/BlogsApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Blog = ({ data }) => {
  const { user } = useSelector((state) => state.authUser);
  const shortName = data?.user?.name.slice(0, 2);
  const [editable, seteditable] = useState(false);
  let Url = window.location.href.split("/");
  let cUrl = Url[Url.length - 1];
  const navigate = useNavigate();
  const [deleteBlog] = useDeleteBlogMutation();
  const handleDelete = async () => {
    await deleteBlog({ id: data._id, token: user.token });
  };
  const handleEdit = () => {
    navigate(`/myBlog/edit/${data._id}`);
  };
  useEffect(() => {
    if (cUrl === "myBlog") {
      seteditable(true);
    } else {
      seteditable(false);
    }
  }, [cUrl]);

  return (
    <div className=" col-lg-3 col-md-4 col-sm-10 m-4 ">
      <div className="card blog-card  ">
        <div className="row ">
          <div className="col-4  ">
            <Link style={{ textDecoration: "none" }} to={`/blogs/${data._id}`}>
              <img
                src={data.image}
                className="img-fluid rounded-start "
                style={{ height: "200px" }}
                alt="..."
              />
            </Link>
          </div>

          <div className="col-8 ">
            <div className="row  mt-1">
              <span className="avatar col-4"> {shortName}</span>
              <p className="col-4 mt-1">{data.user.name}</p>
              {editable && (
                <div className="col-4 d-flex flex-md-wrap flex-lg-wrap ms-auto">
                  <button
                    className="btn btn-danger me-1 btn-sm mb-1"
                    onClick={() => handleDelete()}
                  >
                    <FontAwesomeIcon icon={faTrash} size="xs" />
                  </button>
                  <button
                    className="btn btn-primary btn-sm mb-1"
                    onClick={() => handleEdit()}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} size="xs" />
                  </button>
                </div>
              )}
            </div>

            <Link
              className="card-body "
              style={{ textDecoration: "none" }}
              to={`/blogs/${data._id}`}
            >
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{textShortner(data.description)}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
