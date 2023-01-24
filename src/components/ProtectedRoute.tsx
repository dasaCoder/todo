import { User } from "firebase/auth";
import React, { ReactNode } from "react";
import { useAppSelector } from "../hooks/reduxHelpers";
import { useNavigate } from "react-router-dom";

class ProtectedRouteProps {
  children: ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  const user: User | undefined = useAppSelector(
    (state) => state.auth.user as User
  );
  console.assert(user, "user is not empty");
  console.log(user);
  if (!user) navigate("/login");

  return <div>{children}</div>;
};
