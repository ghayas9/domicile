import React, { useState } from 'react'
import PrimaryButton from '../UserComponents/components/buttons/PrimaryButton'
import forgort from '../UserComponents/assets/forgot.png'
import { NotificationManager} from 'react-notifications';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

export default function ForgotPassword() {

    const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:3000/api/v1",
      });

    const [load ,setload] = useState(false)
    const [email,setEmail] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          setload(true)
          const res = await axiosInstance.post('/auth/forgotpassword', {email,},{
                headers: {
                  "Content-Type": "application/json",
                },
              });
            console.log(res);
            NotificationManager.success(res.data.message,'Sucess')
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
                    <label htmlFor="">Email Address</label>.
                    <div className="login__form--input">
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
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
