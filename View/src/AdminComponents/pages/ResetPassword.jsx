import { useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import axiosInstance from "../services/axiosInstance/AxiosInstace";
import { NotificationManager} from 'react-notifications';

import CircularProgress from '@mui/material/CircularProgress';

const ResetPassword = () => {
  const [load ,setload] = useState(false)
  const [currentPassword,setcurrentPassword] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm,setpasswordConfirm] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password === passwordConfirm ){
    try{
      setload(true)
      const res = await axiosInstance.post('/auth/updatepassword', {
        currentPassword,
        password,
        passwordConfirm
      }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(res);
          NotificationManager.success('Password Changed Successfully','Sucess')
      }catch(err){
        console.log(err)
        NotificationManager.error(err.response.data.message,'Error')
      }finally{
        setload(false)
      }
    
    }
      else{
        NotificationManager.error('Password mismatch','Error')
      }
  };
  return (
    <div className="login__form">

      <div className="container">
        <div className="login__form--container">
          <form action="" onSubmit={handleSubmit}>
            <div className="login__form--title">
              <h4>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Please create a new password that <br /> You don't use on any
                other site.{" "}
              </h4>
            </div>
            <div className="login__form--box">
              <label htmlFor="">Current Password</label>.
              <div className="login__form--input">
                <input type="password" value={currentPassword} onChange={(e)=>{setcurrentPassword(e.target.value)}}/>
              </div>
            </div>
            <div className="login__form--box">
              <label htmlFor="">New Password</label>.
              <div className="login__form--input">
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
            </div>

            <div className="login__form--box">
              <label htmlFor="">Confirm Password</label>.
              <div className="login__form--input">
                <input type="password" value={passwordConfirm} onChange={(e)=>{setpasswordConfirm(e.target.value)}}/>
              </div>
            </div>
            <div className="login__form--button">
              <PrimaryButton text={load?<CircularProgress color='primary' size={25}/>:'submit'} tbPadding={0.5} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
