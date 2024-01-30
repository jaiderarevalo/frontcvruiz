import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://192.168.11.101:3000/app",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
