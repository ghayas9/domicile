import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance/AxiosInstace";
export default function useAPI(url,formData) {

  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(()=>{fetchData()},[])

  const fetchData = async()=>{
    try{
        const res = await axiosInstance.post(url, formData, {
              headers: {
                "Content-Type": "application/json",
              },
          });
        console.log(res);
        setdata(res.data);
    }catch(err){
      console.log(err)
      seterror(err.respone.data)
    }finally{
        setloading(false)
    }
  }

  return { data , loading , error }
}


