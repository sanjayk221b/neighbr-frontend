import { createSlice } from "@reduxjs/toolkit";
import { ICaretaker, IResident } from "@/types";

interface AuthState {
  adminLoggedIn: boolean;
  residentLoggedIn: boolean;
  caretakerLoggedIn: boolean;
  adminInfo: IResident | null;
  residentInfo: IResident | null;
  caretakerInfo: Partial<ICaretaker> | null;
}

const initialState: AuthState = {
  adminLoggedIn: localStorage.getItem("adminLoggedIn") ? true : false,
  residentLoggedIn: localStorage.getItem("residentLoggedIn") ? true : false,
  caretakerLoggedIn: localStorage.getItem("caretakerLoggedIn") ? true : false,
  adminInfo: JSON.parse(localStorage.getItem("adminInfo") ?? "null"),
  residentInfo: JSON.parse(localStorage.getItem("residentInfo") ?? "null"),
  caretakerInfo: JSON.parse(localStorage.getItem("caretakerInfo") ?? "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.adminLoggedIn = true;
      localStorage.setItem("adminLoggedIn", "true");
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    setAdminLogout: (state) => {
      state.adminLoggedIn = false;
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminInfo");
      state.adminInfo = null;
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
    setCaretakerLogin: (state, action) => {
      state.caretakerLoggedIn = true;
      localStorage.setItem("caretakerLoggedIn", "true");
      state.caretakerInfo = action.payload;
      localStorage.setItem("caretakerInfo", JSON.stringify(action.payload));
    },
    setCaretakerLogout: (state) => {
      state.caretakerLoggedIn = false;
      localStorage.removeItem("caretakerLoggedIn");
      localStorage.removeItem("caretakerInfo");
      state.caretakerInfo = null;
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
