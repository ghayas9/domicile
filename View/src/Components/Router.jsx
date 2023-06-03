import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import AdminLogin from "../AdminComponents/pages/Login";
import UserLogin from "../UserComponents/pages/Login"
import UserUsigUp from "../UserComponents/pages/Singup"
import Index from "./Index";
import PublicRoutes from "../AdminComponents/components/protectedroute/PublicRoutes";
import AppBar from "./topNav/TopNav";
import ForgotPassword from "./ForgotPassword";
import ForgotAndChangePassword from "./ForgotAndChangePassword";
const RoutesFile = () => {
  const AppLayout = () => {
    return (
      <div>
        <AppBar />
        <div className="layout__content-main">
          <Outlet />
        </div>
      </div>
    );
  };
 
  return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/" element={<Index  />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserUsigUp />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/forgot/:token" element={<ForgotAndChangePassword />} />
          </Route>
        </Route>
      </Routes>
  );
};

export default RoutesFile;
