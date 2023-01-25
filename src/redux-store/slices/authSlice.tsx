import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") as string),
};

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = createAsyncThunk(
  "auth/signUpWithGoogle",
  async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      localStorage.setItem("user", JSON.stringify(user));
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      return user;
    } catch (e) {
      console.error(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      //   console.log("user signed up", state.user, action.payload);
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
