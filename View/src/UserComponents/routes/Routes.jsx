import { Route, Routes, Outlet } from "react-router-dom";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "../components/protectedroute/ProtectedRoute";
import TopNav from "../components/topNav/TopNav";
import DomicileForm from "../pages/DomicileForm";
import Domicile from "../pages/Domicile";
import DomicilesList from "../pages/DomicilesList";

const RoutesFile = () => {
  const AppLayout = () => {
    return (
      <div>
        <TopNav />
        <div className="layout__content-main">
          <Outlet />
        </div>
      </div>
    );
  };
  return (
      <Routes>
        <Route path="/user" element={<AppLayout />}>
          <Route path="/user" element={<ProtectedRoutes />}>
              <Route path="/user/dashboard" element={<Dashboard />}></Route>
              <Route path="/user/domicileform" element={<DomicileForm />} />
              <Route path="/user/resetpassword" element={<ResetPassword />} />
              <Route path="/user/domicile/:id" element={<Domicile />} />
              <Route path="/user/domicile" element={<DomicilesList />} />
          </Route>
        </Route>
      </Routes>
  );
};

export default RoutesFile;
