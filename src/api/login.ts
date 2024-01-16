import { login } from "../interfaces/interfac";
import { instance } from "./axios";

export const logins = (data:login) =>  instance.post('auth/login', data)