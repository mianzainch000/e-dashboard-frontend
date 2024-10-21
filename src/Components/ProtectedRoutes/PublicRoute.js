import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!Cookies.get("token"); // Check if the user is authenticated

  return isAuthenticated ? <Navigate to="/home" /> : children; // If authenticated, redirect to Home
};

export default PublicRoute;
