import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const isAuthenticated =
    sessionStorage.getItem("domicileAdmin")
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/admin/login" />;
  // return auth ? <Outlet /> : <Navigate to={'/'}/>;
};

export default ProtectedRoutes;
