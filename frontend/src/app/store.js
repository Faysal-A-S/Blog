import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../features/User/UserSlice";
import { Api } from "../features/Api/api";

export const store = configureStore({
  reducer: {
    authUser: UserSlice,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(Api.middleware),
});
