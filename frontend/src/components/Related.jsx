import React from "react";
import { useRelatedBlogQuery } from "../features/blogs/BlogsApi";
import { Link, useParams } from "react-router-dom";

const Related = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRelatedBlogQuery(id);

  let content;
  if (isError) {
    content = <p>{error?.data}</p>;
  }
  if (isLoading) {
    content = (
      <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div
          className="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    );
  }
  if (data?.related?.length === 0) {
    content = <p>No related post for this blog</p>;
  }
  if (data?.related?.length > 0) {
    content = data?.related?.map((blog) => (
      <Link
        key={blog._id}
        to={`/blogs/${blog._id}`}
        style={{ color: "black" }}
        className="p-0"
      >
        {blog.title}
      </Link>
    ));
  }
  return (
    <div className=" pt-5 mt-5 ">
      <div className="Related  mx-auto my-auto row   p-5 mt-5">
        <div>
          <h3 className="text-center align-top fw-bold ">Related Posts:</h3>
          <div className="d-flex flex-column">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Related;
