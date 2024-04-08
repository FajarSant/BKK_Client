import axios from "axios";

export const axiosInstance = axios.create ({
    baseURL: "https://bkk-smkn.vercel.app/",
});