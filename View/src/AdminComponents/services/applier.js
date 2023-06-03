import axiosInstance from "./axiosInstance/AxiosInstace";
import { NotificationManager} from 'react-notifications';
//adding the endpoints to the root url
const createDomicileUrl = "/domicile";

//creating domicile
export const createDomicile = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.post(createDomicileUrl, formData);
      console.log(res);
      NotificationManager.success(res.data.message,"Success")
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      NotificationManager.error(error.response.data.message,"Error")
      reject(error);
    }
  });
};

//creating domicile
export const updateDomicile = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.patch(
        `${createDomicileUrl}/image/${id}`,
        data,
      );
      console.log(res);
      NotificationManager.success(res.data.message,"Success")
      resolve(res.data);
    } catch (error) {
      console.log(error);
      NotificationManager.error(error.response.data.message,"Error")
      reject(error);
    }
  });
};

export const getDomiciles = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(createDomicileUrl+'/'+id);
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      NotificationManager.error(error.response.data.message,"Error")
      reject(error);
    }
  });
}
