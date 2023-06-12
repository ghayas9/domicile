import React, { useState } from 'react'
import { InputMask } from 'primereact/inputmask';

import { NotificationManager} from 'react-notifications';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios"

export default function SearchBar() {

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/api/v1",
  });

  const [cnic,setcnic] = useState('')
  const [load ,setload] = useState(false)
const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setload(true)
      const res = await axiosInstance.get("/domicile/cnic/"+cnic,{
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
    <form onSubmit={handleSubmit} style={{display:"flex",justifyContent:'center'}}>
        <div style={{display:"flex"
        ,alignItems:"center",
        justifyContent:'center',
        flexDirection:"column",
        backgroundColor:'white',
        padding:"10px 20px",
        borderRadius:"10px"
        }}>
          {load?<CircularProgress/>:null}
          <label htmlFor="">Search with CNIC</label>.
          <div style={{margin:"2px"}} className='login__form--input'>
            <InputMask 
            onChange={(e)=>setcnic(e.target.value)}
            value={cnic} 
            type="text"
            name="cnic"
            mask="99999-9999999-9" 
            required
            placeholder="99999-9999999-9" />

          <input type="submit" value="Search"  
          style={{
          marginTop:'10px',
          width:"100%",
          backgroundColor:'green',
          padding:'10px',
          height:'40px'
          }}/>
          </div>
          
        </div>
    </form>
  )
}
