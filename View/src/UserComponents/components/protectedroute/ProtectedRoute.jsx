import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") 
    &&
    sessionStorage.getItem("accessJWT") &&
    ! sessionStorage.getItem("domicileAdmin")
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoutes = () => {
  const auth = useAuth();

  // // return auth ? <Outlet /> : null;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
