import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1",
  // headers: {
  //   "Content-Type": "application/json"
  // }
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config);
    const tokenStr = sessionStorage.getItem("accessJWT");
    if (tokenStr) config.headers.Authorization = `Bearer ${tokenStr}`;
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
