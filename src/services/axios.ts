import axios from "axios";
import { URL_API } from "../firebase/redencialesENV/ENV";

export const Axios = axios.create({
  baseURL: URL_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
