import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://192.168.11.105:3000/app",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
