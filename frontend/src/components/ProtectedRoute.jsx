import { Navigate } from "react-router-dom";
import * as tk from "../api/token";

export const ProtectedRoute = ({ children }) => {
  if (!tk.isTokenValid()) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
