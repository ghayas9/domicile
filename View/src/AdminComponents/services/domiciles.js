import axiosInstance from "./axiosInstance/AxiosInstace";

//adding the endpoints to the root url
const getDomicilesUrl = "/domicile";
const approveDomicileUrl = "/domicile/approved";
import { NotificationManager} from 'react-notifications';
//getting domicile
export const getDomiciles = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(getDomicilesUrl);
      console.log(res);

      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      NotificationManager.error(error.response.data.message,"Error")
      reject(error);
    }
  });
};

//delete domicile
export const approveDomicile = (id) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.patch(`${approveDomicileUrl}/${id}`);
      console.log(res);

      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      NotificationManager.error(error.response.data.message,"Error")
      reject(error);
    }
  });
};

export const deleteDomicile = (id) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.delete(`${getDomicilesUrl}/${id}`);
      console.log(res);

      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      NotificationManager.error(error.response.data.message,"Error")
      reject(error);
    }
  });
};
