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

  return (auth ?
  sessionStorage.getItem("domicileAdmin") ?
   <Navigate to={'/admin/dashboard'}/> : 
   sessionStorage.getItem("accessJWT")
   ? <Navigate to={'/user/dashboard'}/> : null: <Outlet/> )
};

export default PublicRoutes;
