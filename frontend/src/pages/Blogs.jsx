import React from "react";
import Blog from "../components/Blog";
import { useGetAllBlogsQuery } from "../features/blogs/BlogsApi";

const Blogs = () => {
  const { data, error, isLoading } = useGetAllBlogsQuery();

  let content;
  if (error) {
    content = <p>{error?.data}</p>;
  }
  if (isLoading) {
    content = <div class="loader">Loading...</div>;
  }
  if (data?.blogs?.length === 0) {
    content = <h3>No blogs found....</h3>;
  }
  if (data?.blogs?.length > 0) {
    content = data?.blogs?.map((blog) => <Blog data={blog} key={blog?._id} />);
  }

  return <div className="row">{content}</div>;
};

export default Blogs;
