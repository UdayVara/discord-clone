import axios from "axios";
import { auth } from "./auth";
import { signoutUser } from "@/actions/Auth.action";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_URL}`// process.env.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let access_token: string = '';
    const isServer = typeof window === 'undefined'
    if (isServer) {
      const userObj = await auth();
      const user = userObj?.user
      if (user) {
        console.log('server Component')
        const user:any = await auth();
        console.log("user",user)
        access_token = user.user.token  || ''
      }
    } else {
      if(typeof localStorage !== 'undefined'){
        access_token = localStorage && localStorage.getItem('access_token') || ''
      }
    }
    console.log(access_token)
    if (access_token) {
      if (!config.headers["authorization"]) {
        config.headers.authorization = `Bearer ${access_token}`;
      } else {
        config.headers.authorization = `Bearer ${access_token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    console.log('axios error:', error.response?.data);
    if(error.response?.data?.statusCode == 401){
      await signoutUser()
      
      // console.log("Inside 403")
    }
    // console.log("Axios Response : ",error.response)
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;
