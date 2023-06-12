import { useState } from "react";
// import { Grid } from "@mui/material";
import PrimaryButton from "../components/buttons/PrimaryButton";
// import { userLogin } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../services/auth";

import { InputMask } from 'primereact/inputmask';

import { NotificationManager} from 'react-notifications';

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
    if(formInput.password === formInput.passwordConfirm && formInput.password){
    try {
      const isAuth = await userSignup(formInput);
      console.log(isAuth);
      if (isAuth.status === "success") {
        NotificationManager.success('successfully register','Registered')
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error(error.response.data.message,'ERROR')
    }
  }
    else{
      NotificationManager.error('Password mismatch or empty','ERROR')
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
                  required
                  value={formInput.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">CNIC</label>.
              <div className="login__form--input">
                <InputMask value={formInput.cnic} 
                onChange={handleChange} 
                type="text"
                name="cnic"
                mask="99999-9999999-9" 
                required
                placeholder="99999-9999999-9" />
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Email Address</label>.
              <div className="login__form--input">
                <input
                  type="email"
                  placeholder="Enter Email address"
                  name="email"
                  required
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
                  required
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
                  required
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
