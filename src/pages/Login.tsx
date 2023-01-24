import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHelpers";
import { signInWithGoogle } from "../redux-store/slices/authSlice";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();

  const handleLoginOrSignUp = () => {
    dispatch(signInWithGoogle());
  };

  const user: User | undefined = useAppSelector(
    (state) => state.auth.user as User
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
    console.log("ue user", user);
  }, [navigate, user]);

  return (
    <Grid>
      <Button onClick={handleLoginOrSignUp}>Login With Google</Button>
    </Grid>
  );
};
