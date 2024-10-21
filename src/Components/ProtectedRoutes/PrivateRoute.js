import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Here, you should check for your authentication token or session
  const isAuthenticated = !!Cookies.get("token"); // Replace with your actual authentication logic

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
