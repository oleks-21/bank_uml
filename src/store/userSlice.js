import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accountType: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accountType = action.payload.accountType;
    },
    clearUser: (state) => {
      state.user = null;
      state.accountType = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
