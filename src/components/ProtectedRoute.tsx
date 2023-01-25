import { User } from "firebase/auth";
import React, { ReactNode } from "react";
import { useAppSelector } from "../hooks/reduxHelpers";
import { Navigate } from "react-router-dom";

class ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user: User | undefined = useAppSelector(
    (state) => state.auth.user as User
  );
  if (!user) return <Navigate to="/login" replace />;

  return <div>{children}</div>;
};
