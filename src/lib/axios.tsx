import axios from "axios";

export const axiosInstance = axios.create ({
    baseURL: "https://backend-bkk.vercel.app/",
});