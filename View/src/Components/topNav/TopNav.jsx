import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <div className="top__nav">
      <div className="top__nav--container">
      <Link to="/">
        <div className="top__nav--logo">
          <img src="/public/pak_logo.png" alt="" />
          <h2>
          Domicile</h2>
        </div>
        </Link>
        <div className="top__nav--links">
          <ul>
            <li>
              <Link to="/login">LogIn</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up </Link>
            </li>
            <li>
              <Link to="/admin/login">Admin </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
