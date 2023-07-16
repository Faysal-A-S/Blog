import React from "react";
import { useParams } from "react-router-dom";
import { useGetOneBlogQuery } from "../features/blogs/BlogsApi";
import Main from "../components/Main";
import Related from "../components/Related";

const BlogMain = () => {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useGetOneBlogQuery(id);
  let content;
  if (isLoading) {
    content = content = <div class="loader">Loading...</div>;
  }
  if (isError) {
    content = <p>{error?.data}</p>;
  }
  if (data?.blog?.length > 0) {
    content = (
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-8">
          <Main data={data.blog} />
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Related />
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default BlogMain;
