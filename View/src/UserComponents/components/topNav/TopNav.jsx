import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated", true);
    localStorage.removeItem("domicileApp");
    navigate("/");
    sessionStorage.removeItem("accessJWT");
  };
  return (
    <div className="top__nav">
      <div className="top__nav--container">
        <div className="top__nav--logo">
          <img src="/public/pak_logo.png" alt="" />
          <h2>Domicile</h2>
        </div>
        <div className="top__nav--links">
          <ul>
            <li>
              <Link to="/user/domicileform">Fill Form</Link>
            </li>
            <li>
              <Link to="/user/domicile">List </Link>
            </li>
            <li>
              <Link to="/user/dashboard">About Us</Link>
            </li>
            <li>
              <Link to="/user/resetpassword">Change Password</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
