import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://blog-a6njhtj5z-faysal-a-s.vercel.app/`,
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ["allBlogs", "myBlogs", "Blog", "related"],
  endpoints: (builder) => ({}),
});
