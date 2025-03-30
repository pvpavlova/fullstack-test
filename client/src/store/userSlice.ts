import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
