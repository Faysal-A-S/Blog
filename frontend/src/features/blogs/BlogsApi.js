import { Api } from "../Api/api";

export const blogApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog/all",
        method: "GET",
      }),
      providesTags: ["allBlogs"],
    }),
    getOneBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    myBlog: builder.query({
      query: (data) => ({
        url: "blog/myblog/blogs",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data}`,
        },
      }),
      providesTags: ["myBlogs"],
    }),
    relatedBlog: builder.query({
      query: (data) => ({
        url: `blog/related/${data}`,
        method: "GET",
      }),
      providesTags: ["related"],
    }),
    addBlog: builder.mutation({
      query: ({ token, data }) => ({
        url: "/blog/add",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["myBlogs", "allBlogs", "Blog"],
    }),
    editBlog: builder.mutation({
      query: ({ token, data }) => ({
        url: `/blog/update/${data._id}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["myBlogs", "allBlogs", "Blog"],
    }),
    deleteBlog: builder.mutation({
      query: ({ token, id }) => ({
        url: `/blog/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["myBlogs", "allBlogs", "Blog"],
    }),
  }),
});
export const {
  useGetAllBlogsQuery,
  useMyBlogQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useGetOneBlogQuery,
  useEditBlogMutation,
  useRelatedBlogQuery,
} = blogApi;
