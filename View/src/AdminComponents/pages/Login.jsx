// import { useState } from "react";
// import { Grid } from "@mui/material";
import { NotificationManager} from 'react-notifications';
import PrimaryButton from "../components/buttons/PrimaryButton";
// import { userLogin } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";

// import { Link } from "react-router-dom";
import { userLogin } from "../services/auth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  //handling the login function and pass the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);

    //calling the api for login user
    try {
      const isAuth = await userLogin(data);
      console.log(isAuth);
      if (isAuth.status === "success") {
        localStorage.setItem("isAuthenticated", true);
        navigate("/admin/dashboard");
      }
      NotificationManager.success('LogIn Successfully','Succes')
    } catch (error) {
      console.log(error);
      NotificationManager.error(error.response?.data.message,'Error')
    }
  };
  return (
    <div className="login__form">
      <div className="container">
        <div className="login__form--container">
          <form action="" onSubmit={handleSubmit}>
            <div className="login__form--title">
              <h2>LOGIN ( ADMIN )</h2>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Email Address</label>.
              <div className="login__form--input">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <HiOutlineMail />
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Password</label>.
              <div className="login__form--input">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
                <AiOutlineEye />
              </div>
            </div>
            <div className="login__form--remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="login__form--button">
              <PrimaryButton text="Login" tbPadding={0.5} />
            </div>
            <div className="login__form--links">
              {/* <button>
                <Link to="/forgot">Forgot password</Link>
              </button> */}
              {/* <button>
                <Link to="/signup">Registration</Link>
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
