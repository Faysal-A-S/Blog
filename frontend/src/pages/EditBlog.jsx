import React from "react";
import { useGetOneBlogQuery } from "../features/blogs/BlogsApi";
import { useParams } from "react-router-dom";
import BlogEditForm from "../components/BlogEditForm";
const EditBlog = () => {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useGetOneBlogQuery(id);

  let content;
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
  if (isError) {
    content = <p>{error?.data}</p>;
  }
  if (data?.blog?.length > 0) {
    content = <BlogEditForm data={data.blog} />;
  }

  return <div>{content}</div>;
};

export default EditBlog;
