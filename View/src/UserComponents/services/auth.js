import axiosInstance from "./axiosInstance/AxiosInstace";

//adding the endpoints to the root url
const signupUrl = "/auth/signup";
const loginUrl = "/auth/signin";



//form data is the actual data coming from the form
export const userSignup = (formData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.post(signupUrl, formData, {
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

//form data is the actual data coming from the form
export const userLogin = (formData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosInstance.post(loginUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      // localStorage.setItem('isAuthenticated',true)
      // navigate('/dashboard')

      //put the jwt token in local storage and in session
      if (res.data?.status === "success") {
        // console.log("This is the token", res.data?.token)
        sessionStorage.setItem("accessJWT", res.data?.token);
        localStorage.setItem(
          "domicileApp",
          JSON.stringify({ refreshJWT: res.data?.token })
        );
      }
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
