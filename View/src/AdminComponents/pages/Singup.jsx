import { useState } from "react";
// import { Grid } from "@mui/material";
import PrimaryButton from "../components/buttons/PrimaryButton";
// import { userLogin } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../services/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    cnic: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) =>
    setFormInput({ ...formInput, [e.target.name]: e.target.value });

  //handling the login function and pass the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput);

    //calling the api for login user
    try {
      const isAuth = await userSignup(formInput);
      console.log(isAuth);
      if (isAuth.status === "success") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login__form">
      <div className="container">
        <div className="login__form--container">
          <form
            action=""
            onSubmit={handleSubmit}
            style={{ padding: "0rem 2rem" }}
          >
            <div className="login__form--title">
              <h2>SIGNUP</h2>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Full Name</label>.
              <div className="login__form--input">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formInput.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">CNIC</label>.
              <div className="login__form--input">
                <input
                  type="text"
                  placeholder="Enter CNIC or Form B No"
                  name="cnic"
                  value={formInput.cnic}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Email Address</label>.
              <div className="login__form--input">
                <input
                  type="email"
                  placeholder="Enter Email address"
                  name="email"
                  value={formInput.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Password</label>.
              <div className="login__form--input">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formInput.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Confirm Password</label>.
              <div className="login__form--input">
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="passwordConfirm"
                  value={formInput.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="login__form--button">
              <PrimaryButton text="Submit" tbPadding={0.5} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
