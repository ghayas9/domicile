import axiosInstance from "./axiosInstance/AxiosInstace";

//adding the endpoints to the root url
const createDomicileUrl = "/domicile";

//creating domicile
export const createDomicile = (formData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.post(createDomicileUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

//creating domicile
export const updateDomicile = (id, data) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.patch(
        `${createDomicileUrl}/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const getDomiciles = (id) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.get(createDomicileUrl+'/'+id);
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
