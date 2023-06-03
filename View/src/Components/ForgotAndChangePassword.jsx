import React, { useState } from 'react'
import PrimaryButton from '../UserComponents/components/buttons/PrimaryButton'
import forgort from '../UserComponents/assets/forgot.png'
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { NotificationManager} from 'react-notifications';
import { useNavigate, useParams } from 'react-router-dom';

export default function ForgotAndChangePassword() {
    const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:3000/api/v1",
      });
    const [load ,setload] = useState(false)
    const [password,setPassword] = useState('')
    const [passwordConfirm,setpasswordConfirm] = useState('')
    const nv = useNavigate()
    const { token } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          setload(true)
          const res = await axiosInstance.post('/auth/resetpassword/'+token, {password,passwordConfirm},{
                headers: {
                  "Content-Type": "application/json",
                },
              });
            console.log(res);
            NotificationManager.success(res.data.message,'Sucess')
            nv('/login')
          }catch(err){
            console.log(err)
            NotificationManager.error(err.response.data.message,'Error')
          }finally{
            setload(false)
          }
      };

  return (
    <div className="login__form">

            <div className="container">
            <div className="login__form--container">
                <form action="" onSubmit={handleSubmit}>
                <div className="login__form--title" style={{marginBottom:'20px'}}>
                        <img src={forgort} style={{width:'150px'}} alt="" />
                        <h2>
                            Forgot Password
                        </h2>
                </div>
                <div className="login__form--box">
                    <label htmlFor="">Password</label>.
                    <div className="login__form--input">
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                </div>
                <div className="login__form--box">
                    <label htmlFor="">conform Password</label>.
                    <div className="login__form--input">
                    <input type="password" value={passwordConfirm} onChange={(e)=>{setpasswordConfirm(e.target.value)}}/>
                    </div>
                </div>
                <div className="login__form--button">
                    <PrimaryButton text={'submit'} icon={load?<CircularProgress color='primary' size={25}/>:null} tbPadding={0.5} />
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
