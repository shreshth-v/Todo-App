import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnprotectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return !user ? children : <Navigate to="/" />;
};

export default UnprotectedRoute;
