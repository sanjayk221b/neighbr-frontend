import { createSlice } from "@reduxjs/toolkit";
import IResident from "../../types/resident";

interface AuthState {
  adminLoggedIn: boolean;
  residentLoggedIn: boolean;
  caretakerLoggedIn: boolean;
  residentInfo: Partial<IResident> | null;
}

const initialState: AuthState = {
  adminLoggedIn: localStorage.getItem("adminLoggedIn") ? true : false,
  residentLoggedIn: localStorage.getItem("residentLoggedIn") ? true : false,
  caretakerLoggedIn: localStorage.getItem("caretakerLoggedIn") ? true : false,
  residentInfo: localStorage.getItem("residentInfo") ? JSON.parse(localStorage.getItem("residentInfo")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminLogin: (state) => {
      state.adminLoggedIn = true;
      localStorage.setItem("adminLoggedIn", "true");
    },
    setAdminLogout: (state) => {
      state.adminLoggedIn = false;
      localStorage.removeItem("adminLoggedIn");
    },
    setResidentLogin: (state, action) => {
      state.residentLoggedIn = true;
      localStorage.setItem("residentLoggedIn", "true");
      state.residentInfo = action.payload;
      localStorage.setItem("residentInfo", JSON.stringify(action.payload));
    },
    setResidentLogout: (state) => {
      state.residentLoggedIn = false;
      localStorage.removeItem("residentLoggedIn");
      localStorage.removeItem("residentInfo");
      state.residentInfo = null;
    },
    setCaretakerLogin: (state) => {
      state.caretakerLoggedIn = true;
      localStorage.setItem("caretakerLoggedIn", "true");
    },
    setCaretakerLogout: (state) => {
      state.caretakerLoggedIn = false;
      localStorage.removeItem("caretakerLoggedIn");
    },
  },
});

export const {
  setAdminLogin,
  setAdminLogout,
  setResidentLogin,
  setResidentLogout,
  setCaretakerLogin,
  setCaretakerLogout,
} = authSlice.actions;
export default authSlice.reducer;
