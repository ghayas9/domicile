import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  domicile: {},
};

const domicileDetails = createSlice({
  name: "domicileDetails",
  initialState,
  reducers: {
    isDomicile: (state, { payload }) => {
      state.domicile = payload;
    },
  },
});

export const { isDomicile } = domicileDetails.actions;
export default domicileDetails.reducer;
