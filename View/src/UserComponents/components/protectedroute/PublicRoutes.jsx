import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated")
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
};

const PublicRoutes = () => {
  const auth = useAuth();

  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
