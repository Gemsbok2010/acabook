import { createSlice } from "@reduxjs/toolkit";
// Create Slice helps with making reducers change states

export const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    value: {
      firstName: "",
      lastName: "",
      email: "",
      survey: "",
      phone: "",
      nationalId: "",
      gender: "",
      birth: "",
      filename: "",
      isLoggedIn: null,
      isTeacher: null,
      isActive: null,
      nanoId: null,
      isAdmin: null,
      completeAccess: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = {
        firstName: "",
        lastName: "",
        email: "",
        survey: "",
        phone: "",
        nationalId: "",
        gender: "",
        birth: "",
        filename: "",
        isLoggedIn: false,
        isTeacher: false,
        isActive: false,
        nanoId: null,
        isAdmin: false,
        completeAccess: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
