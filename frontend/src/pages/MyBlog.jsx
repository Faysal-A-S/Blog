import React from "react";
import { useMyBlogQuery } from "../features/blogs/BlogsApi";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";

const MyBlog = () => {
  const { user } = useSelector((state) => state.authUser);
  const { data, isLoading, error } = useMyBlogQuery(user.token);

  let content;
  if (error) {
    content = <p>{error?.data?.message}</p>;
  }
  if (isLoading) {
    content = content = <div class="loader">Loading...</div>;
  }
  if (data?.blogs?.length === 0) {
    content = <h3>No blogs found....</h3>;
  }
  if (data?.blogs?.length > 0) {
    content = data?.blogs?.map((blog) => <Blog data={blog} key={blog?._id} />);
  }

  return <div className="row">{content}</div>;
};

export default MyBlog;
