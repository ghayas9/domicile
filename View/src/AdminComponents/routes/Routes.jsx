import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "../components/protectedroute/ProtectedRoute";
import TopNav from "../components/topNav/TopNav";
import DomicilesList from "../pages/DomicilesList";
// import Domicile from "../../UserComponents/pages/Domicile";
 import Domicile from "../pages/Domicile";
 import DomicileForm from "../pages/DomicileForm"


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
        <Route path="/admin" element={<AppLayout />}>
          <Route path="/admin" element={<ProtectedRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/domiclies" element={<DomicilesList />} />
            <Route path="/admin/domicile/:id" element={<Domicile />} />
            <Route path="/admin/domicile/edit/:id" element={<DomicileForm />} />
            <Route path="/admin/resetpassword" element={<ResetPassword />} />
          </Route>
        </Route>
        {/* <Route path="/admin/signup" element={<Signup />} /> */}

      </Routes>
  );
};

export default RoutesFile;
