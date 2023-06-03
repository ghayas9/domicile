import { configureStore } from "@reduxjs/toolkit";
import domicileReducer from "./reducers/domicileSlice";

// console.log(authApi);

export const store = configureStore({
  reducer: {
    domicile: domicileReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
